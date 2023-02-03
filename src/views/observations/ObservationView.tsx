import { PlusOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { ObservationFilter } from '../../components/observations/ObservationFilter';
import { ObservationTable } from '../../components/observations/tables/ObservationTable';
import { AuthContext } from '../../context';
import { useAxiosObservation } from '../../hooks/observations/useAxiosObservation';
import { IButtonProps } from '../../interfaces/utils';

export const ObservationView = () => {

    const { user } = useContext( AuthContext );
    const [ page, setPage ] = useState( 1 );
    const [ filters, setFilters ] = useState({ });
    

    const { observations, loading, getFiltered, count, edit } = useAxiosObservation();

    const buttons: IButtonProps[] = [
        /* {
            icon: <PlusOutlined />,
            shape: "round",
            content: "Agregar",
            onClick: () => {  },
        } */
    ];


    useEffect(() => {
        console.log('useEffectObservationView');
        getFiltered( filters, page );
    }, [ filters, page ]);
    

    return (
        <div>

            <ViewHeader 
                title = 'Observaciones'
                buttons = { buttons }
            />

            {/* Filter component */}
            <ObservationFilter 
                setFilters  = { setFilters }
                setPage     = { setPage } 
            />

            <ObservationTable
                count       = { count }
                edit        = { edit }
                filters     = { filters }
                setPage     = { setPage }
                setFilters  = { setFilters }
                loading     = { loading }
                page        = { page }
                observations = { observations }
                userType    = { user?.type }
            />

        </div>
    )
}
