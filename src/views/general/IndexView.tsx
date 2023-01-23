import React from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { InspectionCard } from '../../components/inspections/cards/InspectionCard';
import { ObservationCard } from '../../components/observations/cards/ObservationCard';

import styles from '../../styles/views/IndexView.module.css';

export const IndexView = () => {
    return (
        <div>
            
            <ViewHeader title = 'Bienvenido a la plataforma de Inspecciones / Observaciones'/>
            
            <div className = { styles.cardContainer } >
                
                <InspectionCard />

                <ObservationCard />
            </div>

        </div>
    )
}
