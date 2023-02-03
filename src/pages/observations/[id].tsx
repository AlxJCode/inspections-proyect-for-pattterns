import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LeftLayout } from '../../layouts/LeftLayout';
import { ObservationDetailView } from '../../views/observations/ObservationDetailView';
//import { ObservationDetailView } from '../../views/observations/ObservationDetailView';

const ObservationDetail = () => {

    const router = useRouter();
    const [ id, setId ] = useState<number | undefined>( undefined );

    useEffect(() => {
        if ( typeof (router.query.id) === 'string' ) {
            setId( parseInt(( router.query.id )) );
        }
    }, [ router ]);

    return (
        <div>
            <LeftLayout title = 'Observación' selectedKey = { 3 }>
                <ObservationDetailView id = { id } />
            </LeftLayout>
        </div>
    )
};

export default ObservationDetail;

