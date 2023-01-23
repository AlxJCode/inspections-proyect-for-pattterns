import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosArea } from '../../../../hooks/users/useAxiosArea';
import { useAxiosUser } from '../../../../hooks/users/useAxiosUser';
import { IUserDetail } from '../../../../interfaces/users/user';
import { userToJson } from '../../../../utils/transforms';

interface Props {
    openModalAddUser    : boolean;
    setOpenModalAddUser : React.Dispatch<React.SetStateAction<boolean>>;
    setFilters          : React.Dispatch<React.SetStateAction<{}>>;
}

export const AddUserForm = ({ openModalAddUser, setOpenModalAddUser, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { areas, getFiltered, loading } = useAxiosArea( );
    const { createNewUser } = useAxiosUser()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalAddUser = () => {
        setOpenModalAddUser( false );
    };

    const onFinishRegister = async ( values: IUserDetail ) => {
        setLoadingButton( true );
        const newUser = userToJson( values );
        try {
            const { status } = await createNewUser( newUser );
            if ( status ) setLoadingButton( false );
            if ( status === 201 ) {
                message.success( 'Usuario creado correctamente.' );
            }
            onCancelModalAddUser();
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
            title ="Crear nuevo usuario"
            open ={ openModalAddUser }
            onCancel ={ onCancelModalAddUser }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'CreateUser'
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
