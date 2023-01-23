import { DatePicker, Form, Input, Radio } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { IInspectionType } from '../../../../interfaces/inspections/inspectionType';
import styles from '../styles.module.css';

const layout = {
    labelCol: {
        span: 4,
    },
};

interface Props {
    datetime        : Date;
    zoneName        : string;
    areaName        : string;
    typeModel       ?: IInspectionType;
    inspectionTypes : IInspectionType[]
    loading         : boolean;
}

export const InspectionDetails = ( { datetime, areaName, typeModel, zoneName, inspectionTypes, loading }: Props ) => {

    const [ form ] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            datetime: moment( datetime ),
            areaName,
            zoneName,
            planned: typeModel?.id,
            noPlanned: typeModel?.id,
        });
    }, [ ]);
    

    return (
        <div>
            <div className = { styles.title }>
                <span>Datos de la inspección</span>
            </div>
            <Form 
                { ...layout } 
                labelAlign = "left"
                labelWrap    
                form = { form }
            >
                <div>
                    <Form.Item name = "datetime" 
                        label = "FECHA Y HORA"
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name = "areaName" 
                        label = "ÁREA INSPECCIONADA"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "zoneName" 
                        label = "ZONA"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name = "planned" 
                        label = "TIPO PLANEADA"
                    >
                        <Radio.Group >
                            {
                                inspectionTypes.map(( i ) => {
                                    if ( i.name === "Planeada" ) {
                                        return (
                                            <Radio key = { i.id } value = { i.id }>{ i.subtype }</Radio>
                                        )
                                    }
                                })
                            }
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name = "noPlanned" 
                        label = "TIPO NO PLANEADA"
                    >
                        <Radio.Group >
                        {
                                inspectionTypes.map(( i ) => {
                                    if ( i.name === "No Planeada" ) {
                                        return (
                                            <Radio key = { i.id } value = { i.id }>{ i.subtype }</Radio>
                                        )
                                    }
                                })
                            }
                        </Radio.Group>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
