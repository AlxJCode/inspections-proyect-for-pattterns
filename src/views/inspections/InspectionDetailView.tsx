import { Divider, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { ViewHeader } from '../../components/general/ViewHeader';
import { EmployerDetails } from '../../components/inspections/inspectionDetails/EmployerDetails';
import { InspectionConclutions } from '../../components/inspections/inspectionDetails/InspectionConclutions';
import { InspectionDetails } from '../../components/inspections/inspectionDetails/InspectionDetails';
import { InspectionDetailsTable } from '../../components/inspections/inspectionDetails/InspectionDetailsTable';
import { ResponsablesDetails } from '../../components/inspections/inspectionDetails/ResponsablesDetails';
import { useAxiosInspection } from '../../hooks/inspections/useAxiosInspection';
import { useAxiosInspectionDetail } from '../../hooks/inspections/useAxiosInspectionDetail';
import { useAxiosInspectionType } from '../../hooks/inspections/useAxiosInspectionType';
import { useAxiosInspectionUser } from '../../hooks/inspections/useAxiosInspectionUser';

interface Props {
    id ?: number;
};

export const InspectionDetailView = ( { id }: Props ) => {

    const { inspections, getFiltered: getFilteredI, loading: loadI } = useAxiosInspection();
    const { inspectionTypes, getFiltered: getFilteredIT, loading: loadIT } = useAxiosInspectionType();
    const { inspectionUsers, getFiltered: getFilteredIU, loading:loadIU } = useAxiosInspectionUser();
    const { inspectionDetails, getFiltered: getFilteredID, loading: loadID } = useAxiosInspectionDetail();

    useEffect(() => {
        if ( id ) getFilteredI({ filter: { id } }, 1 );
        console.log("useEffect inspection");
    }, [ id ]);

    useEffect(() => {
        getFilteredIT({ filter: {  } } );
        console.log("useEffect inspectionType");
    }, [  ]);

    useEffect(() => {
        if ( id ) getFilteredIU({ filter: { inspection_id: id } }, 1 );
        console.log("useEffect inspectionUser");
        console.log( inspectionUsers )
    }, [ id ]);

    useEffect(() => {
        if ( id ) getFilteredID({ filter: { inspection_id: id } }, 1 );
        console.log("useEffect inspectionUserDetails");
        
    }, [ id ]);

    return (
        <div>
            <ViewHeader title='Detalles de la inspección' />

            {
                ( inspections[0] && !loadI ) ? (
                    <EmployerDetails 
                        companyName             = { inspections[0].companyName }
                        ruc                     = { inspections[0].companyRuc }
                        companyActivity         = { inspections[0].companyActivity }
                        companyAddress          = { inspections[0].companyAddress }
                        companyTotalEmployees   = { inspections[0].companyTotalEmployees }
                        inspectionObjective     = { inspections[0].inspectionObjective }
                    />
                ) : (
                    <Skeleton active/>
                )
            }

            <Divider type='horizontal' />

            {
                ( inspections[0] && !loadI ) ? (
                    <InspectionDetails 
                        areaName        = { inspections[0].areaName }
                        datetime        = { inspections[0].datetime }
                        typeModel       = { inspections[0].typeModel }
                        zoneName        = { inspections[0].zoneName }
                        inspectionTypes = { inspectionTypes }
                        loading         = { loadIT }                        
                    />
                ) : (
                    <Skeleton active/>
                )
            }

            <Divider type='horizontal' />

            {
                ( inspections[0] && !loadI && !loadIU ) ? (
                    <ResponsablesDetails 
                        responsableName         = { inspections[0].userFullName }
                        responsablePosition     = { inspections[0].userOccupation }
                        responsableSignature    = { inspections[0].userSignature }          
                        inspectionUsers         = { inspectionUsers }
                    />
                ) : (
                    <Skeleton active/>
                )
            }
            
            <Divider type='horizontal' />

            {
                ( inspections[0] && !loadID ) ? (
                    <InspectionDetailsTable 
                        inspectionDetails = { inspectionDetails }                   
                    />
                ) : (
                    <Skeleton active/>
                )
            }

            <Divider type='horizontal' />

            {
                ( inspections[0] && !loadI ) ? (
                    <InspectionConclutions 
                        causesOfInfavourableResults = { inspections[0].causesOfInfavourableResults }
                        conclutions                 = { inspections[0].conclutions }
                        recommendations             = { inspections[0].recommendations }                     
                    />
                ) : (
                    <Skeleton active/>
                )
            }

        </div>
    );
}
