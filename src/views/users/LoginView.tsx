import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import useWindowSize from '../../hooks/utils/useWindowSize';
import styles from '../../styles/views/LoginView.module.css';
import logoIGH from '../../../public/images/logo-igh-large.png';
import { LoginForm } from '../../components/users/forms/LoginForm';

const appName = "Inspecciones";
const titlePage = `Iniciar Sesión | ${appName}`;

export const LoginView = () => {
    const { width } = useWindowSize();

    return (
        <div className = {styles.loginContainer}>
            <Head>
                <title>{ titlePage }</title>
            </Head>
            {!(width < 768) && (
                <div className = {styles.loginContainerLeft} style={{ padding: "1rem" }}>
                    <Image src = { logoIGH } height = { 228 } width = { 417 } alt = "logo IGH" />
                </div>
            )}
            <div className={styles.loginContainerRight}>
                <div className={styles.loginForm}>
                    <div className={styles.loginTop}>
                        <h4>Iniciar Sesión</h4>
                        {/* {(width < 768) && (
                            <Image src={logoIGH2} height={200} width={220} alt="logo IGH" />
                        )} */}
                        <p style = {{ fontSize: "16px" }}>Ingrese sus credenciales</p>
                    </div>
                    <div className = {styles.loginMid}>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
