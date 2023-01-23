import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosCompany } from '../../../../hooks/users/useAxiosCompany';
import { ICompany } from '../../../../interfaces/users/company';
import { companyToJson } from '../../../../utils/transforms';

interface Props {
    openModalAddCompany     : boolean;
    setOpenModalAddCompany  : React.Dispatch<React.SetStateAction<boolean>>;
    setFilters              : React.Dispatch<React.SetStateAction<{}>>;
}

export const AddCompanyForm = ({ openModalAddCompany, setOpenModalAddCompany, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { createNewCompany } = useAxiosCompany()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalAddCompany = () => {
        setOpenModalAddCompany( false );
    };

    const onFinishRegister = async ( values: ICompany ) => {
        setLoadingButton( true );
        const newCompany = companyToJson( values );
        try {
            const { status } = await createNewCompany( newCompany );
            if ( status ) setLoadingButton( false );
            if ( status === 201 ) {
                message.success( 'Empresa creada correctamente.' );
            }
            onCancelModalAddCompany();
            setFilters( { filter: {} } );
        } catch ( error ) {
            console.log( error );
            setLoadingButton( false );
        }
    };

    return (
        <Modal
            title ="Crear nueva empresa"
            open ={ openModalAddCompany }
            onCancel ={ onCancelModalAddCompany }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'CreateCompany'
                scrollToFirstError
                layout='vertical'
                requiredMark = "optional"
                onFinish = { onFinishRegister }
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
