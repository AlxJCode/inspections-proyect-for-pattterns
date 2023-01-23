import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosArea } from '../../../../hooks/users/useAxiosArea';
import { useAxiosCompany } from '../../../../hooks/users/useAxiosCompany';
import { IArea } from '../../../../interfaces/users/area';
import { areaToJson } from '../../../../utils/transforms';

interface Props {
    openModalAddArea    : boolean;
    setOpenModalAddArea : React.Dispatch<React.SetStateAction<boolean>>;
    setFilters          : React.Dispatch<React.SetStateAction<{}>>;
}

export const AddAreaForm = ({ openModalAddArea, setOpenModalAddArea, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { companies, getFiltered, loading } = useAxiosCompany( );
    const { createNewArea } = useAxiosArea()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalAddArea = () => {
        setOpenModalAddArea( false );
    };

    const onFinishRegister = async ( values: IArea ) => {
        setLoadingButton( true );
        const newArea = areaToJson( values );
        try {
            const { status } = await createNewArea( newArea );
            if ( status ) setLoadingButton( false );
            if ( status === 201 ) {
                message.success( 'Área creada correctamente.' );
            }
            onCancelModalAddArea();
            setFilters( { filter: {} } );
        } catch ( error ) {
            console.log( error );
            setLoadingButton( false );
        }
    };

    useEffect(() => {
        getFiltered({
            filter: {
                state: true,
            }
        });
    }, [ ]);
    

    return (
        <Modal
            title ="Crear nueva área"
            open ={ openModalAddArea }
            onCancel ={ onCancelModalAddArea }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'CreateArea'
                scrollToFirstError
                layout='vertical'
                requiredMark = "optional"
                onFinish = { onFinishRegister }
            >  
                <div className = 'autoGrid'>
                    <Form.Item name = "name"
                        label = "Nombres"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese sus nombres.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese sus nombres' maxLength = { 60 }/>
                    </Form.Item>
                    <Form.Item name = "companyId" 
                        label = "Empresa"
                        hasFeedback
                    >
                        <Select placeholder = "Seleccione una empesa"
                            loading = { loading }
                        >
                            {
                                companies.map( company => (
                                    <Select.Option value = { company.id }>{ company.name }</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
