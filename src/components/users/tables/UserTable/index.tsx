import { Button, message, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import styles from './UserTable.module.css';
import { EditFilled, QuestionCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useWindowSize from '../../../../hooks/utils/useWindowSize';
import { IUser, IUserDB, IUserDetail } from '../../../../interfaces/users/user';
import { userToJson } from '../../../../utils/transforms';
import { EditUserForm } from '../../forms/EditUserForm';


interface UserTableProps {
    users           : IUserDetail[];
    loading         : boolean;
    count           : number;
    page            : number;
    setPage         : React.Dispatch<React.SetStateAction<number>>;
    setFilters      : React.Dispatch<React.SetStateAction<{}>>;
    filters         : {};
    edit            : (id: number, user: IUserDB) => Promise<{status: number;editedUser: IUser;} | {status: any;editedUser?: undefined;}>
    userType        ?: string;
}

export const UserTable = ({ users, loading, count, page, setPage, edit, setFilters, filters, userType }: UserTableProps) => {

    const { width } = useWindowSize();
    const [ confirmLoading, setConfirmLoading ] = useState( false );
    const router = useRouter();
    const [ openModalEditUser, setOpenModalEditUser ] = useState( false );
    const [ editUser, setEditUser ] = useState<IUserDetail | undefined>();

    const onClickEditUser = (user: IUserDetail) => {
        setEditUser( user );
        setOpenModalEditUser( true );
    };

    const onEditActivation = async (user: IUserDetail) => {
        setConfirmLoading(true);
        let body = userToJson( user );
        body.state = !body.state;
        if ( !body.id ) return
        const { status } = await edit( body.id, body );
        if ( status ) setConfirmLoading( false );
        if ( status === 200 ) {
            setFilters({ });
            setPage( 1 );
            message.success("Usuario actualizado.");
        };
    };

    const caseUser = ( type:string ) => {
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

    const columns: ColumnsType<IUserDetail> = [
        {
            key: 'user',
            title: 'Nombre',
            dataIndex: 'user',
            render(value, record, index) {
                return (
                    <div className={styles.nameColumnContainer}>
                        <div className={styles.txtContainer}>
                            <span className={styles.name}>{ `${record.name} ${record.firstLastName} ${record.secondLastName}` }</span>
                            <span className={styles.doc}>{ record.dni }</span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            render(value, record, index) {
                return <>{ record.email }</>
            }
        },
        {
            key: 'phone',
            title: 'Celular',
            dataIndex: 'phone',
            render(value, record, index) {
                return <>{ record.phone }</>
            }
        },
        {
            key: 'area',
            title: 'Área',
            dataIndex: 'area',
            render(value, record, index) {
                return <>{ record.areaModel?.name }</>
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
                                onClickEditUser( record );
                            }}
                        />
                    </Space>
                )
            }
        },
    ];

    const columnsOnlyRead: ColumnsType<IUserDetail> = [
        {
            key: 'user',
            title: 'Nombre',
            dataIndex: 'user',
            render(value, record, index) {
                return (
                    <div className={styles.nameColumnContainer}>
                        <div className={styles.imageContainer}>
                        </div>
                        <div className={styles.txtContainer}>
                            <span className={styles.name}>{ `${record.name} ${record.firstLastName} ${record.secondLastName}` }</span>
                            <span className={styles.doc}>{ record.dni }</span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            render(value, record, index) {
                return <>{ record.email }</>
            }
        },
        {
            key: 'phone',
            title: 'Celular',
            dataIndex: 'phone',
            render(value, record, index) {
                return <>{ record.phone }</>
            }
        },
        {
            key: 'area',
            title: 'Área',
            dataIndex: 'area',
            render(value, record, index) {
                return <>{ record.areaModel?.name }</>
            }
        },
    ];

    return (
        <div style={{ overflow: "auto", boxSizing: "border-box", margin: "1rem 0" }}>
            {
                editUser && (
                    <EditUserForm 
                        openModalEditUser = { openModalEditUser }
                        setOpenModalEditUser = { setOpenModalEditUser }
                        user = { editUser }
                        setFilters = { setFilters }
                    />
                )
            }
            <Table
                size={ width < 768 ? 'small' : "large" }
                columns={ ( userType ? caseUser( userType ) : columnsOnlyRead ) }
                dataSource={ users }
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
