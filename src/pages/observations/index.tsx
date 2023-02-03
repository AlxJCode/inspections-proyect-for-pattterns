import React from 'react';
import { LeftLayout } from '../../layouts/LeftLayout'
import { ObservationView } from '../../views/observations/ObservationView';

const Observations = () => {
    return (
        <div>
            <LeftLayout title = 'Observaciones' selectedKey = { 3 }>
                <ObservationView />
            </LeftLayout>
        </div>
    )
}

export default Observations