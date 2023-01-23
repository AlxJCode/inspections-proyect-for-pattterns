import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { AddUserForm } from '../../components/users/forms/AddUserForm';
import { UserTable } from '../../components/users/tables/UserTable';
import { UserFilter } from '../../components/users/UserFilter';
import { AuthContext } from '../../context';
import { useAxiosUser } from '../../hooks/users/useAxiosUser';
import { IButtonProps } from '../../interfaces/utils';

export const UserView = () => {

    const { user } = useContext( AuthContext );
    const [ page, setPage ] = useState( 1 );
    const [ filters, setFilters ] = useState({ });
    const [ openModalAddUser, setOpenModalAddUser ] = useState( false );
    

    const { users, loading, getFiltered, count, edit } = useAxiosUser();

    const buttons: IButtonProps[] = [
        {
            icon: <UsergroupAddOutlined />,
            shape: "round",
            content: "Carga masiva",
            onClick: () => { /* router.push('/users/bulk') */ },
        },
        {
            icon: <UserAddOutlined />,
            shape: "round",
            content: "Agregar",
            onClick: () => { setOpenModalAddUser( true ) },
        }
    ];


    useEffect(() => {
        console.log('useEffectUserView');
        getFiltered( filters, page );
    }, [ filters, page ]);
    

    return (
        <div>

            <ViewHeader 
                title = 'Usuarios'
                buttons = { buttons }
            />

            <AddUserForm
                openModalAddUser = { openModalAddUser }
                setOpenModalAddUser = { setOpenModalAddUser }
                setFilters = { setFilters }
            />

            {/* Filter component */}
            <UserFilter 
                setFilters  = { setFilters }
                setPage     = { setPage } 
            />

            <UserTable
                count       = { count }
                edit        = { edit }
                filters     = { filters }
                setPage     = { setPage }
                setFilters  = { setFilters }
                loading     = { loading }
                page        = { page }
                users       = { users }
                userType    = { user?.type }
            />

        </div>
    )
}
