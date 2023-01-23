import { Button, message, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { EditFilled, QuestionCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useWindowSize from '../../../../hooks/utils/useWindowSize';
import { areaToJson, userToJson } from '../../../../utils/transforms';
/* import { EditAreaForm } from '../../forms/EditAreaForm'; */
import { IArea, IAreaDB } from '../../../../interfaces/users/area';
import { EditAreaForm } from '../../forms/EditAreaForm';


interface AreaTableProps {
    areas           : IArea[];
    loading         : boolean;
    count           : number;
    page            : number;
    setPage         : React.Dispatch<React.SetStateAction<number>>;
    setFilters      : React.Dispatch<React.SetStateAction<{}>>;
    filters         : {};
    edit            : (id: number, user: IAreaDB) => Promise<{status: number;editedArea: IArea;} | {status: any;editedArea?: undefined;}>
    userType        ?: string;
}

export const AreaTable = ({ areas, loading, count, page, setPage, edit, setFilters, filters, userType }: AreaTableProps) => {

    const { width } = useWindowSize();
    const [ confirmLoading, setConfirmLoading ] = useState( false );
    const [ openModalEditArea, setOpenModalEditArea ] = useState( false );
    const [ editArea, setEditArea ] = useState<IArea | undefined>();

    const onClickEditArea = (area: IArea) => {
        setEditArea( area );
        setOpenModalEditArea( true );
    };

    const onEditActivation = async (area: IArea) => {
        setConfirmLoading(true);
        let body = areaToJson( area );
        body.state = !body.state;
        if ( !body.id ) return
        const { status } = await edit( body.id, body );
        if ( status ) setConfirmLoading( false );
        if ( status === 200 ) {
            setFilters({ });
            setPage( 1 );
            message.success("Área actualizada.");
        };
    };

    const caseArea = ( type:string ) => {
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

    const columns: ColumnsType<IArea> = [
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
            key: 'company',
            title: 'Empresa',
            dataIndex: 'company',
            render(value, record, index) {
                return (
                    <>
                        { record.companyModel?.name }
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
                                onClickEditArea( record );
                            }}
                        />
                    </Space>
                )
            }
        },
    ];

    const columnsOnlyRead: ColumnsType<IArea> = [
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
            key: 'company',
            title: 'Empresa',
            dataIndex: 'company',
            render(value, record, index) {
                return (
                    <>
                        { record.companyModel?.name }
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
                editArea && (
                    <EditAreaForm 
                        openModalEditArea = { openModalEditArea }
                        setOpenModalEditArea = { setOpenModalEditArea }
                        area = { editArea }
                        setFilters = { setFilters }
                    />
                )
            }
            <Table
                size={ width < 768 ? 'small' : "large" }
                columns={ ( userType ? caseArea( userType ) : columnsOnlyRead ) }
                dataSource={ areas }
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
