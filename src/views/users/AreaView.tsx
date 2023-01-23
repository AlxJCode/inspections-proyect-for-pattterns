import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { AddAreaForm } from '../../components/users/forms/AddAreaForm';
import { AreaTable } from '../../components/users/tables/AreaTable';
import { AuthContext } from '../../context';
import { useAxiosArea } from '../../hooks/users/useAxiosArea';
import useWindowSize from '../../hooks/utils/useWindowSize';
import { IButtonProps } from '../../interfaces/utils';

export const AreaView = () => {

    const { user } = useContext( AuthContext );
    const [ page, setPage ] = useState( 1 );
    const [ filters, setFilters ] = useState({ });
    const [ openModalAddArea, setOpenModalAddArea ] = useState( false );
    const { width } = useWindowSize();

    const { areas, loading, getFiltered, count, edit } = useAxiosArea();

    const buttons: IButtonProps[] = [
        {
            icon: <UserAddOutlined />,
            shape: "round",
            content: "Agregar",
            onClick: () => { setOpenModalAddArea( true ) },
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
        console.log('useEffectAreaView');
        getFiltered( filters, page );
    }, [ filters, page ]);

    return (
        <div>
            
            <ViewHeader 
                title = 'Áreas'
                buttons = { buttons }
            />

            <AddAreaForm
                openModalAddArea = { openModalAddArea }
                setOpenModalAddArea = { setOpenModalAddArea }
                setFilters = { setFilters }
            />


            <div style={{ marginBottom: "1rem" }}>
                <Input
                    prefix = { <SearchOutlined /> }
                    placeholder = "Áreas..."
                    size={ width < 768 ? "middle" : "large" }
                    onChange = { onChange }
                />
            </div>

            <AreaTable
                count       = { count }
                edit        = { edit }
                filters     = { filters }
                setPage     = { setPage }
                setFilters  = { setFilters }
                loading     = { loading }
                page        = { page }
                areas       = { areas }
                userType    = { user?.type }
            />

        </div>
    );
}
