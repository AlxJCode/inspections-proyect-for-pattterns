import { EyeOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Space, Statistic } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { IInspection } from '../../../../interfaces/inspections/inspection';

interface Props {
    inspection: IInspection;
}

export const InspectionItem = ( { inspection }: Props ) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/inspections/${ inspection.id }`);
    };
    
    return (
        <Card.Grid hoverable = { true } style = {{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Space wrap size = { 16 } >
                <Statistic title = "Fecha de creación" value = { inspection.datetime ? moment( inspection.datetime ).format( "YYYY-MM-DD" ) : "--" } />     
                <Statistic title = "Zona" value = { inspection.zoneName } />     
            </Space>
            <div style = {{ padding: "1rem" }}>
                <Button
                    type = 'primary'
                    icon = { <EyeOutlined /> }
                    onClick = { onClick }
                >
                    Ver detalles
                </Button>
            </div>
        </Card.Grid>
    )
}
