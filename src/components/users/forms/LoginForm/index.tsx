import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import styles from '../../../../styles/views/LoginView.module.css';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../context';

type LoginFormProps = {
    username: string;
    password: string;
};

export const LoginForm = () => {

    const { login } = useContext( AuthContext );
    const router = useRouter();
    const [ loadingButton, setLoadingButton ] = useState( false );


    const onSubmit = async (values: LoginFormProps) => {
        const { username, password } = values;
        
        setLoadingButton(true);
        const isValid = await login(username, password);
        if ( !isValid ) {
            setLoadingButton(false);
            message.error("Credenciales incorrectas.");
            return
        }

        message.success( "Sesión iniciada." )
        const destination = router.query.p?.toString() || "/";
        setLoadingButton( false );
        router.replace( destination );
    };

    return (
        <Form
            onFinish = {onSubmit}
            name = "login"
        >
            <div className={styles.inputContainer}>
                <label>Usuario</label>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su usuario',
                        },
                    ]}
                >
                    <Input
                        className={styles.input}
                        prefix={<UserOutlined />}
                        size='large'
                        placeholder='Ingrese su usuario'
                    />
                </Form.Item>

            </div>
            <div className={styles.inputContainer}>
                <label>Contraseña</label>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa tu contraseña',
                        },
                    ]}
                >
                    <Input.Password
                        className={styles.input}
                        prefix={<LockOutlined />}
                        size='large'
                        placeholder='Ingrese su contraseña'
                    />
                </Form.Item>
            </div>
            <div className={styles.inputSubmitContainer}>
                <Button
                    htmlType="submit"
                    loading={loadingButton}
                    className={styles.button}
                    type='primary'
                    size='large'
                >
                    INGRESAR
                </Button>
            </div>
        </Form>
    )
}