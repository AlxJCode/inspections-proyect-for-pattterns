import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LeftLayout } from '../../layouts/LeftLayout';
import { InspectionDetailView } from '../../views/inspections/InspectionDetailView';

const InspectionDetail = () => {

    const router = useRouter();
    const [ id, setId ] = useState<number | undefined>( undefined );

    useEffect(() => {
        if ( typeof (router.query.id) === 'string' ) {
            setId( parseInt(( router.query.id )) );
        }
    }, [ router ]);

    return (
        <div>
            <LeftLayout title = 'Inpección' selectedKey = { 2 }>
                <InspectionDetailView id = { id } />
            </LeftLayout>
        </div>
    )
};

export default InspectionDetail;

