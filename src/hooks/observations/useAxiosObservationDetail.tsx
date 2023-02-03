import { message } from "antd";
import { useState } from "react";
import { IObservationDetail, IObservationDetailDB } from "../../interfaces/observations/observationDetail";
import { createObservationDetail, editObservationDetail, getFilterObservationDetails, getObservationDetails } from "../../services";
import { formatObservationDetail } from "../../utils/transforms/observations/observationDetail";

export const useAxiosObservationDetail = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ observationDetails, setObservationDetails ] = useState<IObservationDetail[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllObservationDetails = async ( page?: number) => {
        try {
            const data = await getObservationDetails( page );
            if ( data ) {
                setObservationDetails( data.observationDetails );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los detalles de observaciones' );
        }
    }

    const createNewObservationDetail = async ( user: IObservationDetailDB ) => {
        try {
            const data = await createObservationDetail( user );
            const status:number = data.status;
            const newObservationDetail:IObservationDetail = formatObservationDetail( data.data.data );
            return { status, newObservationDetail }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterObservationDetails( page, filters );
            if (data.observationDetails) {
                setObservationDetails( data.observationDetails );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los detalles de observaciones' );
        }
    }

    const edit = async (id: number, user: IObservationDetailDB) => {
        try {
            const data = await editObservationDetail( id, user );
            const status:number = data.status;
            const editedObservationDetail:IObservationDetail = formatObservationDetail( data.data.data );
            return { status, editedObservationDetail }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        observationDetails,
        loading,
        count,
        getAllObservationDetails,
        createNewObservationDetail,
        getFiltered,
        edit,
    }
}
