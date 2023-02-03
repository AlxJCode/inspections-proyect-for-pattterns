import { ColumnsType } from 'antd/es/table';
import React from 'react';
import moment from 'moment';
import styles from '../styles.module.css';
import { IObservationDetail } from '../../../../interfaces/observations/observationDetail';
import { Button, Progress, Space, Table } from 'antd';
import { RenderAssessment } from '../../../inspections/renders/RenderAssessment';

interface Props {
    observationDetails : IObservationDetail[];
}

export const ObservationDetailsTable = ({ observationDetails }: Props ) => {

    const columns: ColumnsType<IObservationDetail> = [
        {
            key: 'key',
            title: "N",
            dataIndex: 'key',
            align: "center",
            render( value, record ) {
                return (
                    <div>
                        { value }
                    </div>
                )
            }
        },
        {
            key: "affectedCode",
            title: "Brecha u Oportunidad",
            dataIndex : "affectedCode",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        { value }
                    </div>
                )
            },
        },
        {
            key: "affectedName",
            title: "Acto/Comportamiento o Condicion Observada",
            dataIndex : "affectedName",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        { value }
                    </div>
                )
            },
        },
        {
            key: "type",
            title: "Tipos de Acto Subestádar/Comportamiento inseguro",
            dataIndex : "type",
            width: 200,
            render( value, record ) {
                return (
                    <div>
                        { value }
                    </div>
                )
            },
        },
        {
            key: "assessmentName",
            title: "Nivel de Riesgo",
            dataIndex : "assessmentName",
            render( value, record ) {
                return (
                    <div>
                        { RenderAssessment( { assessment: value } ) }
                    </div>
                )
            },
        },
        {
            key: "correctiveTasks",
            title: "Detalle de la acción correctiva",
            dataIndex : "correctiveTasks",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        { value }
                    </div>
                )
            },
        },
        {
            key: "reponsibles",
            title: "Responsable de la acción correctiva",
            dataIndex : "reponsibles",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        <Space direction = 'vertical'>
                            {
                                record.responsibleUsers?.map( r => (
                                    <Space>
                                        <div>{ r.userFullName }</div>
                                        <div>{ r.userDni }</div>
                                    </Space>
                                    
                                ))
                            }
                        </Space>
                    </div>
                )
            },
        },
        {
            key: "complianceDate",
            title: "Fecha de cumplimiento",
            dataIndex : "complianceDate",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        { moment( value ).format("YYYY-MM-DD HH:mm:ss") }
                    </div>
                )
            },
        },
    ];

    console.log( "observationDetailsssss", observationDetails );

    return (
        <div>
            <div className = { styles.title }>
                <span>Detalles</span>
            </div>
            <Table
                dataSource  = { observationDetails }
                columns     = { columns }
                pagination  = { false }
                loading     = { false }
                scroll      = {{ x: 2000 }}
            />
        </div>
    );
}
