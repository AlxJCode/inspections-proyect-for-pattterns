import React from 'react';
import { LeftLayout } from '../../layouts/LeftLayout'
import { InspectionView } from '../../views/inspections/InspectionView';

const Inspections = () => {
    return (
        <div>
            <LeftLayout title = 'Inspecciones' selectedKey = { 2 }>
                <InspectionView />
            </LeftLayout>
        </div>
    )
}

export default Inspections