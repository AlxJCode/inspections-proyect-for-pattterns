import { Card, Skeleton, Space } from 'antd';
import React, { useEffect } from 'react'
import { useAxiosObservation } from '../../../../hooks/observations/useAxiosObservation';
import { RenderStatusIO } from '../../../general/render/RenderStatusIO';
import { ObservationItem } from '../ObservationItem';

export const ObservationCard = () => {

    const { observations, getFiltered, loading } = useAxiosObservation();

    useEffect(() => {
        getFiltered({
            filter: {
                observation_detail__assesment_name: "Alto",
            }
        }, 1);
    }, [  ]);
    

    return (
        <div>
            <Card title = "Últimas observaciones con riesgos ALTOS" >
                <div>
                    <Space direction = 'vertical' size = { 16 } style = {{ width: "100%" }}>
                        {
                            observations.map( i => (
                                <ObservationItem observation = { i } key = { i.id }/>
                            ))
                        }
                        {
                            loading && <Skeleton active />
                        }
                        {
                            observations.length == 0 && (
                                <RenderStatusIO 
                                    msg = 'No hay observaciones con riesgos ALTOS'
                                />
                            )
                        }
                    </Space>
                </div>
            </Card>
        </div>
    );
}
