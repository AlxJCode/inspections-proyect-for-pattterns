import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { AddCompanyForm } from '../../components/users/forms/AddCompanyForm';
import { CompanyTable } from '../../components/users/tables/CompanyTable';
import { AuthContext } from '../../context';
import { useAxiosCompany } from '../../hooks/users/useAxiosCompany';
import useWindowSize from '../../hooks/utils/useWindowSize';
import { IButtonProps } from '../../interfaces/utils';

export const CompanyView = () => {

    const { user } = useContext( AuthContext );
    const [ page, setPage ] = useState( 1 );
    const [ filters, setFilters ] = useState({ });
    const [ openModalAddCompany, setOpenModalAddCompany ] = useState( false );
    const { width } = useWindowSize();

    const { companies, loading, getFiltered, count, edit } = useAxiosCompany();

    const buttons: IButtonProps[] = [
        {
            icon: <UserAddOutlined />,
            shape: "round",
            content: "Agregar",
            onClick: () => { setOpenModalAddCompany( true ) },
        }
    ];

    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { value } = e.target;
        setFilters({
            filter: {
                name__icontains : value
            }
        });
        setPage ( 1 );
    };

    useEffect(() => {
        console.log('useEffectCompanyView');
        getFiltered( filters, page );
    }, [ filters, page ]);

    return (
        <div>
            
            <ViewHeader 
                title = 'Empresas'
                buttons = { buttons }
            />

            <AddCompanyForm
                openModalAddCompany = { openModalAddCompany }
                setOpenModalAddCompany = { setOpenModalAddCompany }
                setFilters = { setFilters }
            />


            <div style={{ marginBottom: "1rem" }}>
                <Input
                    prefix = { <SearchOutlined /> }
                    placeholder = "Empresas..."
                    size={ width < 768 ? "middle" : "large" }
                    onChange = { onChange }
                />
            </div>

            <CompanyTable
                count       = { count }
                edit        = { edit }
                filters     = { filters }
                setPage     = { setPage }
                setFilters  = { setFilters }
                loading     = { loading }
                page        = { page }
                companies   = { companies }
                userType    = { user?.type }
            />

        </div>
    );
}
