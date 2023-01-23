import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosCompany } from '../../../../hooks/users/useAxiosCompany';
import { ICompany } from '../../../../interfaces/users/company';
import { companyToJson } from '../../../../utils/transforms';

interface Props {
    openModalEditCompany    : boolean;
    setOpenModalEditCompany : React.Dispatch<React.SetStateAction<boolean>>;
    company                 : ICompany;
    setFilters              : React.Dispatch<React.SetStateAction<{}>>;
}

export const EditCompanyForm = ({ company, openModalEditCompany, setOpenModalEditCompany, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { edit } = useAxiosCompany()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalEditCompany = () => {
        setOpenModalEditCompany( false );
    };

    const onFinish = async ( values: ICompany ) => {

        if ( !company.id ) return;
        setLoadingButton( true );
        const newCompany = companyToJson( values );
        try {
            const { status } = await edit( company.id , newCompany );
            if ( status ) setLoadingButton( false );
            if ( status === 200 ) {
                message.success( 'Empresa editada correctamente.' );
            }
            onCancelModalEditCompany();
            setFilters( { filter: {} } );
        } catch ( error ) {
            console.log( error );
            setLoadingButton( false );
        }
    };

    
    useEffect(() => {
        if ( company ) {
            form.setFieldsValue( company );
        }
    }, [ company ]);

    return (
        <Modal
            title ="Editar empresa"
            open ={ openModalEditCompany }
            onCancel ={ onCancelModalEditCompany }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'EditCompany'
                scrollToFirstError
                layout='vertical'
                requiredMark = "optional"
                onFinish = { onFinish }
            >  
                <div className = 'autoGrid'>
                    <Form.Item name = "name"
                        label = "Nombre"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese el nombre.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese el nombre' maxLength = { 100 }/>
                    </Form.Item>
                    <Form.Item name = "ruc"
                        label = "RUC"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese el nombre.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese el nombre' maxLength = { 50 }/>
                    </Form.Item>
                    <Form.Item name = "economicActivity"
                        label = "Actividad económica"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingresel la actividad económica.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese la actividad económica' maxLength = { 100 }/>
                    </Form.Item>
                    <Form.Item name = "address"
                        label = "Dirección"
                        hasFeedback
                    >
                        <Input placeholder = 'Ingrese la dirección.' maxLength = { 100 }/>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
