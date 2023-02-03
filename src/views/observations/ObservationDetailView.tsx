import { Divider, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { EmployerDetails } from '../../components/observations/observationDetails/EmployerDetails';
import { ObservationDetailsTable } from '../../components/observations/observationDetails/ObservationDetailsTable';
import { ObservationQuestions } from '../../components/observations/observationDetails/ObservationQuestions';
import { ResponsablesDetails } from '../../components/observations/observationDetails/ResponsablesDetails';
import { useAxiosObservation } from '../../hooks/observations/useAxiosObservation';
import { useAxiosObservationAnswer } from '../../hooks/observations/useAxiosObservationAnswer';
import { useAxiosObservationDetail } from '../../hooks/observations/useAxiosObservationDetail';
import { useAxiosObservationType } from '../../hooks/observations/useAxiosObservationType';
import { useAxiosObservationUser } from '../../hooks/observations/useAxiosObservationUser';

interface Props {
    id ?: number;
};

export const ObservationDetailView = ( { id }: Props ) => {

    const { observations, getFiltered: getFilteredO, loading: loadO } = useAxiosObservation();
    const { observationUsers, getFiltered: getFilteredOU, loading:loadOU } = useAxiosObservationUser();
    const { observationDetails, getFiltered: getFilteredOD, loading: loadOD } = useAxiosObservationDetail();
    const { observationAnswers, getFiltered: getFilteredOA, loading: loadOA } = useAxiosObservationAnswer();

    useEffect(() => {
        if ( id ) getFilteredO({ filter: { id } }, 1 );
        console.log("useEffect observation");
    }, [ id ]);


    useEffect(() => {
        if ( id ) getFilteredOA({ filter: { observation_id: id } }, 1 );
        console.log("useEffect observationAnswers");
        console.log( observationAnswers );
    }, [ id ]);

    useEffect(() => {
        if ( id ) getFilteredOU({ filter: { observation_id: id } }, 1 );
        console.log("useEffect observationUser");
        console.log( "observationUsers", observationUsers );
    }, [ id ]);

    useEffect(() => {
        if ( id ) getFilteredOD({ filter: { observation_id: id } }, 1 );
        console.log("useEffect observationUserDetails");
        
    }, [ id ]);

    return (
        <div>
            <ViewHeader title='Detalles de la observación' />

            {
                ( observations[0] && !loadO ) ? (
                    <EmployerDetails 
                        areaName        = { observations[0].areaName }
                        zoneName        = { observations[0].zoneName }
                        userFullName    = { observations[0].userFullName }
                        petCode         = { observations[0].petCode }
                        taskName        = { observations[0].taskName }
                        companyName     = { observations[0].companyName }
                        guard           = { observations[0].guard }
                        datetime        = { observations[0].datetime } 
                    />
                ) : (
                    <Skeleton active/>
                )
            }


            <Divider type='horizontal' />

            {
                ( observations[0] && !loadO && !loadOU ) ? (
                    <ResponsablesDetails 
                        responsableName         = { observations[0].userFullName }
                        responsablePosition     = { observations[0].userOccupation }
                        responsableSignature    = { observations[0].userSignature }          
                        observationUsers         = { observationUsers }
                    />
                ) : (
                    <Skeleton active/>
                )
            }
            
            <Divider type='horizontal' />

            {
                ( observations[0] && !loadO && !loadOA ) ? (
                    <ObservationQuestions 
                        observationAnswers = { observationAnswers }                   
                    />
                ) : (
                    <Skeleton active/>
                )
            }

            <Divider type='horizontal' />

            {
                ( observations[0] && !loadOD ) ? (
                    <ObservationDetailsTable 
                        observationDetails = { observationDetails }                   
                    />
                ) : (
                    <Skeleton active/>
                )
            }

            <Divider type='horizontal' />

            {/* {
                ( observations[0] && !loadI ) ? (
                    <ObservationConclutions 
                        causesOfInfavourableResults = { observations[0].causesOfInfavourableResults }
                        conclutions                 = { observations[0].conclutions }
                        recommendations             = { observations[0].recommendations }                     
                    />
                ) : (
                    <Skeleton active/>
                )
            } */}

        </div>
    );
}
