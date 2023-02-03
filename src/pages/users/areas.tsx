import React from 'react';
import { LeftLayout } from '../../layouts/LeftLayout';
import { AreaView } from '../../views/users/AreaView';

const Areas = () => {
    return (
        <div>
            <LeftLayout title = 'Áreas' selectedKey = { 5 } submenu = { "sub1" }>
                <AreaView />
            </LeftLayout>
        </div>
    )
}

export default Areas