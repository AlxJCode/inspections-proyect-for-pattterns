import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosArea } from '../../../../hooks/users/useAxiosArea';
import { useAxiosUser } from '../../../../hooks/users/useAxiosUser';
import { IUserDetail } from '../../../../interfaces/users/user';
import { userToJson } from '../../../../utils/transforms';

interface Props {
    openModalEditUser   : boolean;
    setOpenModalEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    user                : IUserDetail;
    setFilters          : React.Dispatch<React.SetStateAction<{}>>;
}

export const EditUserForm = ({ user, openModalEditUser, setOpenModalEditUser, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { areas, getFiltered, loading } = useAxiosArea( );
    const { edit } = useAxiosUser()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalEditUser = () => {
        setOpenModalEditUser( false );
    };

    const onFinish = async ( values: IUserDetail ) => {

        if ( !user.id ) return;
        setLoadingButton( true );
        const newUser = userToJson( values );
        try {
            const { status } = await edit( user.id , newUser );
            if ( status ) setLoadingButton( false );
            if ( status === 200 ) {
                message.success( 'Usuario editado correctamente.' );
            }
            onCancelModalEditUser();
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
    
    useEffect(() => {
        if ( user ) {
            form.setFieldsValue( user );
        }
    }, [ user ]);

    return (
        <Modal
            title ="Editar usuario"
            open ={ openModalEditUser }
            onCancel ={ onCancelModalEditUser }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'EditUser'
                scrollToFirstError
                layout='vertical'
                requiredMark = "optional"
                onFinish = { onFinish }
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
                    <Form.Item name = "firstLastName" 
                        label = "Apellido paterno"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese su apellido paterno.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese su apellido paterno' maxLength = { 50 }/>
                    </Form.Item>
                    <Form.Item name = "secondLastName" 
                        label = "Apellido materno"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese su apellido materno.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese su apellido materno' maxLength = { 50 }/>
                    </Form.Item>
                    <Form.Item name = "dni" 
                        label = "DNI"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrese su número de dni.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese su número de dni' maxLength = { 20 }/>
                    </Form.Item>
                    <Form.Item name = "email" 
                        label = "Email"
                        hasFeedback
                        rules = {[
                            {
                                type: "email",
                                message: 'Por favor, ingrese un email válido.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese su email' maxLength = { 50 }/>
                    </Form.Item>
                    <Form.Item name = "phone" 
                        label = "Teléfono"
                        hasFeedback
                    >
                        <Input placeholder = 'Ingrese su número de teléfono' maxLength = { 15 }/>
                    </Form.Item>
                    <Form.Item name = "type" 
                        label = "Tipo de usuario"
                        hasFeedback
                    >
                        <Select placeholder = "Seleccione un tipo de usuario">
                            <Select.Option value = "U">Usuario general</Select.Option>
                            <Select.Option value = "INS">Usuario inspector</Select.Option>
                            <Select.Option value = "SUP">Usuario supervisor</Select.Option>
                            <Select.Option value = "SA">Usuario super administrador</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name = "areaId" 
                        label = "Área"
                        hasFeedback
                    >
                        <Select placeholder = "Seleccione una área"
                            loading = { loading }
                        >
                            {
                                areas.map( area => (
                                    <Select.Option key = { area.id } value = { area.id }>{ area.name }</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
