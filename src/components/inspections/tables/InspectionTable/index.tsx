import { Button, message, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { EditFilled, EyeOutlined, QuestionCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import useWindowSize from '../../../../hooks/utils/useWindowSize';
import { IInspection, IInspectionDB } from '../../../../interfaces/inspections/inspection';
import { inspectionToJson } from '../../../../utils/transforms';
import styles from './UserTable.module.css';
import moment from 'moment';
import { RenderInspectionState } from '../../../general/render/RenderInspectionState/RenderInspectionState';
import { useRouter } from 'next/router';


interface InspectionTableProps {
    inspections     : IInspection[];
    loading         : boolean;
    count           : number;
    page            : number;
    setPage         : React.Dispatch<React.SetStateAction<number>>;
    setFilters      : React.Dispatch<React.SetStateAction<{}>>;
    filters         : {};
    edit            : (id: number, user: IInspectionDB) => Promise<{status: number;editedInspection: IInspection;} | {status: any;editedInspection?: undefined;}>
    userType        ?: string;
}

export const InspectionTable = ({ inspections, loading, count, page, setPage, edit, setFilters, filters, userType }: InspectionTableProps) => {

    const router = useRouter();
    const { width } = useWindowSize();


    const caseInspection = ( type:string ) => {
        switch  ( type )  {
            case "SA":
                return columns;
                break;
            case "AD":
                return columnsOnlyRead;
                break;
            case "ST":
                return columnsOnlyRead;
                break;
            case "T":
                return columnsOnlyRead;
                break;
        
            default:
                return columnsOnlyRead;
                break;
        }
    };

    const columns: ColumnsType<IInspection> = [
        {
            key: 'name',
            title: 'Usuario',
            dataIndex: 'name',
            render(value, record, index) {
                return (
                    <div className={styles.nameColumnContainer}>
                        <div className={styles.txtContainer}>
                            <span className={styles.name}>{ record.userFullName }</span>
                            <span className={styles.doc}>{ record.userDni }</span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'datetime',
            title: 'Fecha',
            dataIndex: 'datetime',
            render(value, record, index) {
                return (
                    <>
                        { moment( value ).format( 'YYYY-MM-DD HH:mm' ) }
                    </>
                )
            }
        },
        {
            key: 'area',
            title: 'Área',
            dataIndex: 'area',
            render(value, record, index) {
                return (
                    <>
                        { record.areaName }
                    </>
                )
            }
        },
        {
            key: 'company',
            title: 'Empresa',
            dataIndex: 'company',
            render(value, record, index) {
                return (
                    <>
                        { record.companyName }
                    </>
                )
            }
        },
        {
            key: 'zoneName',
            title: 'Zona',
            dataIndex: 'zoneName',
            render(value, record, index) {
                return (
                    <>
                        { value }
                    </>
                )
            }
        },
        {
            key: 'type',
            title: 'Tipo',
            dataIndex: 'type',
            render(value, record, index) {
                return (
                    <>
                        { record.typeModel?.name }
                    </>
                )
            }
        },
        {
            key: 'state',
            title: "Estado",
            dataIndex: 'state',
            render(value, record) {
                return (
                    <div>
                        { RenderInspectionState( value ) }
                    </div>
                )
            }
        },
        {
            key: 'options',
            title: "Opciones",
            dataIndex: 'options',
            align: "center",
            render(value, record, index) {
                return (
                    <Space>
                        <Button
                            type = 'primary'
                            size = 'small'
                            icon = { <EyeOutlined /> }
                            onClick = {() => {
                                router.push(`/inspections/${ record.id }`)
                            }}
                        />
                    </Space>
                )
            }
        },
    ];

    const columnsOnlyRead: ColumnsType<IInspection> = [
        {
            key: 'name',
            title: 'Usuario',
            dataIndex: 'name',
            render(value, record, index) {
                return (
                    <div className={styles.nameColumnContainer}>
                        <div className={styles.txtContainer}>
                            <span className={styles.name}>{ record.userFullName }</span>
                            <span className={styles.doc}>{ record.userDni }</span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'datetime',
            title: 'Fecha',
            dataIndex: 'datetime',
            render(value, record, index) {
                return (
                    <>
                        { moment( value ).format( 'YYYY-MM-DD HH:mm' ) }
                    </>
                )
            }
        },
        {
            key: 'area',
            title: 'Área',
            dataIndex: 'area',
            render(value, record, index) {
                return (
                    <>
                        { record.areaName }
                    </>
                )
            }
        },
        {
            key: 'company',
            title: 'Empresa',
            dataIndex: 'company',
            render(value, record, index) {
                return (
                    <>
                        { record.companyName }
                    </>
                )
            }
        },
        {
            key: 'zoneName',
            title: 'Zona',
            dataIndex: 'zoneName',
            render(value, record, index) {
                return (
                    <>
                        { value }
                    </>
                )
            }
        },
        {
            key: 'type',
            title: 'Tipo',
            dataIndex: 'type',
            render(value, record, index) {
                return (
                    <>
                        { record.typeModel?.name }
                    </>
                )
            }
        },
        {
            key: 'state',
            title: "Estado",
            dataIndex: 'state',
            render(value, record) {
                return (
                    <div>
                        { RenderInspectionState( value ) }
                    </div>
                )
            }
        },
    ];

    return (
        <div style={{ overflow: "auto", boxSizing: "border-box", margin: "1rem 0" }}>
            <Table
                size={ width < 768 ? 'small' : "large" }
                columns={ ( userType ? caseInspection( userType ) : columnsOnlyRead ) }
                dataSource={ inspections }
                pagination={{
                    defaultPageSize: 10,
                    total: count,
                    showSizeChanger: false,
                    current: page,
                }}
                scroll={{ x: true }}
                loading={ loading }
                onChange={({ current = 1 }) => {
                    setPage( current );
                }}
            />
        </div>
    )
}
