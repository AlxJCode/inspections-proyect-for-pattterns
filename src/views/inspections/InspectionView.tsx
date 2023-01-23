import { PlusOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { InspectionFilter } from '../../components/inspections/InspectionFilter';
import { InspectionTable } from '../../components/inspections/tables/InspectionTable';
import { AuthContext } from '../../context';
import { useAxiosInspection } from '../../hooks/inspections/useAxiosInspection';
import { IButtonProps } from '../../interfaces/utils';

export const InspectionView = () => {

    const { user } = useContext( AuthContext );
    const [ page, setPage ] = useState( 1 );
    const [ filters, setFilters ] = useState({ });
    

    const { inspections, loading, getFiltered, count, edit } = useAxiosInspection();

    const buttons: IButtonProps[] = [
        /* {
            icon: <PlusOutlined />,
            shape: "round",
            content: "Agregar",
            onClick: () => {  },
        } */
    ];


    useEffect(() => {
        console.log('useEffectInspectionView');
        getFiltered( filters, page );
    }, [ filters, page ]);
    

    return (
        <div>

            <ViewHeader 
                title = 'Inpecciones'
                buttons = { buttons }
            />

            {/* Filter component */}
            <InspectionFilter 
                setFilters  = { setFilters }
                setPage     = { setPage } 
            />

            <InspectionTable
                count       = { count }
                edit        = { edit }
                filters     = { filters }
                setPage     = { setPage }
                setFilters  = { setFilters }
                loading     = { loading }
                page        = { page }
                inspections = { inspections }
                userType    = { user?.type }
            />

        </div>
    )
}
