import { Form, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import styles from '../styles.module.css';

const layout = {
    labelCol: {
        span: 4,
    },
};


interface Props {
    areaName        : string;
    zoneName        : string;
    companyName     : string;
    userFullName    : string;
    taskName        : string;
    petCode         : string;
    guard           : string;
    datetime        : Date
}

export const EmployerDetails = ( { areaName, zoneName, companyName, userFullName, taskName, petCode, datetime, guard }: Props ) => {

    const [ form ] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            areaName,
            zoneName,
            companyName,
            userFullName,
            taskName,
            petCode,
            guard,
            datetime : moment( datetime ).format( 'YYYY-MM-DD HH:mm:ss'),
        });
    }, [ ]);
    

    return (
        <div>
            <div className = { styles.title }>
                <span>Datos del empleador</span>
            </div>
            <Form 
                { ...layout } 
                labelAlign = "left"
                labelWrap
                form = { form }    
            >
                <div>
                    <Form.Item name = "areaName" 
                        label = "Área general"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "zoneName" 
                        label = "Área inspeccionada"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "companyName" 
                        label = "Empresa"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "userFullName" 
                        label = "Observador"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "taskName" 
                        label = "Tarea observada"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "petCode" 
                        label = "Código pet"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "guard" 
                        label = "Guardia"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "datetime" 
                        label = "Fecha"
                    >
                        <Input />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
