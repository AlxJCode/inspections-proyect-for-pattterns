import { Card, Space } from 'antd';
import React, { useEffect } from 'react'
import { useAxiosInspection } from '../../../../hooks/inspections/useAxiosInspection';
import { InspectionItem } from '../InspectionItem';

export const InspectionCard = () => {

    const { inspections, getFiltered, loading } = useAxiosInspection();

    useEffect(() => {
        getFiltered({
            filter: {
                inspection_detail__assesment_name: "Alto",
            }
        }, 1);
    }, [  ]);
    

    return (
        <div>
            <Card title = "Últimas Inspecciones con riesgos ALTOS" >
                <div>
                    <Space direction = 'vertical' size = { 16 } style = {{ width: "100%" }}>
                        {
                            inspections.map( i => (
                                <InspectionItem inspection = { i } key = { i.id }/>
                            ))
                        }
                    </Space>
                </div>
            </Card>
        </div>
    );
}
