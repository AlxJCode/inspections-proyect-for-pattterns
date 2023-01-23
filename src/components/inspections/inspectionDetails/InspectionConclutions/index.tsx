import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import styles from '../styles.module.css';

const layout = {
    labelCol: {
        span: 4,
    },
};

interface Props {
    causesOfInfavourableResults ?: string;
    conclutions                 ?: string;
    recommendations             ?: string;
}

export const InspectionConclutions = ({ causesOfInfavourableResults, conclutions, recommendations }: Props ) => {

    const [ form ] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            causesOfInfavourableResults,
            conclutions,
            recommendations,
        });
    }, [ ]);

    

    return (
        <div>
            <div className = { styles.title }>
                <span>Conclusiones</span>
            </div>
            <Form 
                { ...layout } 
                labelAlign = "left"
                labelWrap
                form = { form }  
                onFinish = { (values) => console.log(values) }
            >
                <div>
                    <Form.Item name = "causesOfInfavourableResults" 
                        label = "DESCRIPCIÓN O CAUSAS ANTE RESULTADOS DESFAVORABLES"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "conclutions" 
                        label = "CONCLUSIONES"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "recommendations" 
                        label = "RECOMENDACIONES"
                    >
                        <Input />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
