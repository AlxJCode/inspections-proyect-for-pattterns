import React from 'react'
import { LeftLayout } from '../../layouts/LeftLayout'
import { UserView } from '../../views/users/UserView'

const Users = () => {
    return (
        <div>
            <LeftLayout title = 'Usuarios' selectedKey = { 4 } submenu = { "sub1" }>
                <UserView />
            </LeftLayout>
        </div>
    )
}

export default Users