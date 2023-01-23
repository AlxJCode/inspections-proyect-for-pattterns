import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import styles from '../styles.module.css';

const layout = {
    labelCol: {
        span: 4,
    },
};

interface Props {
    companyName             : string;
    ruc                     : string;
    companyActivity         ?: string;
    companyAddress          ?: string;
    companyTotalEmployees   ?: number;
    inspectionObjective     ?: string;
}

export const EmployerDetails = ( { companyName, ruc, companyActivity, companyAddress, companyTotalEmployees, inspectionObjective }: Props ) => {

    const [ form ] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            companyActivity,
            companyAddress,
            companyName,
            ruc,
            companyTotalEmployees,
            inspectionObjective
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
                    <Form.Item name = "companyName" 
                        label = "EMPRESA"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "ruc" 
                        label = "RUC"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "companyActivity" 
                        label = "ACTIVIDAD ECONÓMICA"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "companyAddress" 
                        label = "DOMICILIO"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "companyTotalEmployees" 
                        label = "N DE TRABAJADORES"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "inspectionObjective" 
                        label = "OBJETIVO DE LA INSPECCIÓN"
                    >
                        <Input />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
