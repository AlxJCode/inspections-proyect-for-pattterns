import { ColumnsType } from 'antd/es/table';
import React from 'react';
import moment from 'moment';
import styles from '../styles.module.css';
import { IInspectionDetail } from '../../../../interfaces/inspections/inspectionDetail';
import { RenderAssessment } from '../../renders/RenderAssessment';
import { Button, Progress, Space, Table } from 'antd';
import { RenderEvidence } from '../../renders/RenderEvidence';
import { RenderPercentage } from '../../renders/RenderPercentage';
import { RenderStatus } from '../../renders/RenderStatus';

interface Props {
    inspectionDetails : IInspectionDetail[];
}

export const InspectionDetailsTable = ({ inspectionDetails }: Props ) => {

    const columns: ColumnsType<IInspectionDetail> = [
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
            title: "Desarrollo de la inspección",
            children: [
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
                    title: "Detalle de la Brecha u Oportunidad de Mejora",
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
                    key: "site",
                    title: "Sección / Lugar",
                    dataIndex : "site",
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
                    key: "type",
                    title: "Tipo de observación",
                    dataIndex : "type",
                    render( value, record ) {
                        return (
                            <div>
                                { value }
                            </div>
                        )
                    },
                },
                {
                    key: "initialEvidence",
                    title: "Evidencia fotográfica de la observación",
                    dataIndex : "initialEvidence",
                    width: 256,
                    render( value, record ) {
                        return (
                            <div>
                                {
                                    record.evidences?.map( ( e, i ) => {

                                        if ( e.type == "0" ) {
                                            return (
                                                <RenderEvidence evidence = { e } index = { i }/>
                                            )
                                        }
                                        return null
                                    } )
                                }
                            </div>
                        )
                    },
                },
            ],
        },
        {
            title: "Ejecución de Ia acción correctiva",
            children: [
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
                {
                    key: "correctiveEvidence",
                    title: "Evidencia fotográfica de la acción correctiva",
                    dataIndex : "correctiveEvidence",
                    width: 256,
                    render( value, record ) {
                        return (
                            <div>
                                {
                                    record.evidences?.map( ( e, i ) => {

                                        if ( e.type == "1" ) {
                                            return (
                                                <RenderEvidence evidence = { e } index = { i }/>
                                            )
                                        }
                                        return null
                                    } )
                                }
                            </div>
                        )
                    },
                },
            ],
        },
        {
            key: "state",
            title: "Estado / Avance",
            dataIndex : "state",
            width: 256,
            render( value, record ) {
                return (
                    <div>
                        <Space size = { 16 }>
                            <RenderStatus state = { value }/>
                            <RenderPercentage percent = { record.percentage } />
                        </Space>
                    </div>
                )
            },
        }
    ];

    console.log( "inspectionDetailsssss", inspectionDetails );

    return (
        <div>
            <div className = { styles.title }>
                <span>Detalles</span>
            </div>
            <Table
                dataSource  = { inspectionDetails }
                columns     = { columns }
                pagination  = { false }
                loading     = { false }
                scroll      = {{ x: 2000 }}
            />
        </div>
    );
}
