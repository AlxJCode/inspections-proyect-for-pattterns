import { Button, message, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { EditFilled, QuestionCircleOutlined } from '@ant-design/icons';
import useWindowSize from '../../../../hooks/utils/useWindowSize';
import { companyToJson } from '../../../../utils/transforms';
import { ICompany, ICompanyDB } from '../../../../interfaces/users/company';
import { EditCompanyForm } from '../../forms/EditCompanyForm';


interface CompanyTableProps {
    companies       : ICompany[];
    loading         : boolean;
    count           : number;
    page            : number;
    setPage         : React.Dispatch<React.SetStateAction<number>>;
    setFilters      : React.Dispatch<React.SetStateAction<{}>>;
    filters         : {};
    edit            : (id: number, user: ICompanyDB) => Promise<{status: number;editedCompany: ICompany;} | {status: any;editedCompany?: undefined;}>
    userType        ?: string;
}

export const CompanyTable = ({ companies, loading, count, page, setPage, edit, setFilters, filters, userType }: CompanyTableProps) => {

    const { width } = useWindowSize();
    const [ confirmLoading, setConfirmLoading ] = useState( false );
    const [ openModalEditCompany, setOpenModalEditCompany ] = useState( false );
    const [ editCompany, setEditCompany ] = useState<ICompany | undefined>();

    const onClickEditCompany = ( company: ICompany ) => {
        setEditCompany( company );
        setOpenModalEditCompany( true );
    };

    const onEditActivation = async ( company: ICompany ) => {
        setConfirmLoading(true);
        let body = companyToJson( company );
        body.state = !body.state;
        if ( !body.id ) return
        const { status } = await edit( body.id, body );
        if ( status ) setConfirmLoading( false );
        if ( status === 200 ) {
            setFilters({ });
            setPage( 1 );
            message.success("Empresa actualizada.");
        };
    };

    const caseCompany = ( type:string ) => {
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

    const columns: ColumnsType<ICompany> = [
        {
            key: 'name',
            title: 'Nombre',
            dataIndex: 'name',
            render(value, record, index) {
                return (
                    <div >
                        { value }
                    </div>
                );
            },
        },
        {
            key: 'ruc',
            title: 'RUC',
            dataIndex: 'ruc',
            render(value, record, index) {
                return (
                    <>
                        { record.ruc }
                    </>
                )
            }
        },
        {
            key: 'economicActivity',
            title: 'Actividad Económica',
            dataIndex: 'economicActivity',
            render(value, record, index) {
                return (
                    <>
                        { record.economicActivity }
                    </>
                )
            }
        },
        {
            key: 'address',
            title: 'Dirección',
            dataIndex: 'address',
            render(value, record, index) {
                return (
                    <>
                        { record.address }
                    </>
                )
            }
        },
        {
            key: 'state',
            title: "Activo",
            dataIndex: 'state',
            render(value, record) {
                return (
                    <div>
                        <Popconfirm
                            title="¿Seguro de cambiar el estado?"
                            onConfirm={()=> onEditActivation(record)}
                            icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
                            okButtonProps={{
                                loading: confirmLoading,
                            }}
                        >
                            <Switch size={ width < 678 ? "small" : "default" } checked={value}/>
                        </Popconfirm>
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
                            icon = { <EditFilled /> }
                            onClick = {() => {
                                onClickEditCompany( record );
                            }}
                        />
                    </Space>
                )
            }
        },
    ];

    const columnsOnlyRead: ColumnsType<ICompany> = [
        {
            key: 'name',
            title: 'Nombre',
            dataIndex: 'name',
            render(value, record, index) {
                return (
                    <div >
                        { value }
                    </div>
                );
            },
        },
        {
            key: 'ruc',
            title: 'RUC',
            dataIndex: 'ruc',
            render(value, record, index) {
                return (
                    <>
                        { record.ruc }
                    </>
                )
            }
        },
        {
            key: 'economicActivity',
            title: 'Actividad Económica',
            dataIndex: 'economicActivity',
            render(value, record, index) {
                return (
                    <>
                        { record.economicActivity }
                    </>
                )
            }
        },
        {
            key: 'address',
            title: 'Dirección',
            dataIndex: 'address',
            render(value, record, index) {
                return (
                    <>
                        { record.address }
                    </>
                )
            }
        },
        {
            key: 'state',
            title: "Activo",
            dataIndex: 'state',
            render(value, record) {
                return (
                    <div>
                        <Switch size={ width < 678 ? "small" : "default" } checked = { value }/>
                    </div>
                )
            }
        },
    ];

    return (
        <div style={{ overflow: "auto", boxSizing: "border-box", margin: "1rem 0" }}>
            {
                editCompany && (
                    <EditCompanyForm 
                        openModalEditCompany = { openModalEditCompany }
                        setOpenModalEditCompany = { setOpenModalEditCompany }
                        company = { editCompany }
                        setFilters = { setFilters }
                    />
                )
            }
            <Table
                size={ width < 768 ? 'small' : "large" }
                columns={ ( userType ? caseCompany( userType ) : columnsOnlyRead ) }
                dataSource={ companies }
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
