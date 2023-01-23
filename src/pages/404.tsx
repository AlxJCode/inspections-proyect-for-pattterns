import { Button, Result } from 'antd'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'

const FourOhFour = () => {

    const onClick = () => {
        Router.push('/');
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}
        >
            <Head>
                <title>Inspecciones</title>
            </Head>
            <Result
                status="404"
                title="404"
                subTitle="Lo sentimos esta página no existe"
                extra={<Button
                    type="primary"
                    onClick={onClick}
                >Volver al inicio</Button>}
            />
        </div>
    )
}

export default FourOhFour