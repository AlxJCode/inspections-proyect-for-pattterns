import { EyeOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Space, Statistic } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { IObservation } from '../../../../interfaces/observations/observation';

interface Props {
    observation: IObservation;
}

export const ObservationItem = ( { observation }: Props ) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/observations/${ observation.id }`);
    };
    
    return (
        <Card.Grid hoverable = { true } style = {{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Space wrap size = { 16 } >
                <Statistic title = "Fecha de creación" value = { observation.datetime ? moment( observation.datetime ).format( "YYYY-MM-DD" ) : "--" } />     
                <Statistic title = "Zona" value = { observation.zoneName } />     
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
