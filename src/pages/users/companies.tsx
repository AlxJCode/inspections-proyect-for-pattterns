import React from 'react'
import { LeftLayout } from '../../layouts/LeftLayout'
import { CompanyView } from '../../views/users/CompanyView'

const Companies = () => {
    return (
        <div>
            <LeftLayout title = 'Empresas' selectedKey = { 5 } submenu = { "sub1" }>
                <CompanyView />
            </LeftLayout>
        </div>
    )
}

export default Companies