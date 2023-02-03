import { message } from "antd";
import { useState } from "react";
import { IObservation, IObservationDB } from "../../interfaces/observations/observation";
import { createObservation, editObservation, getFilterObservations, getObservations } from "../../services";
import { formatObservation } from "../../utils/transforms/observations/observation";

export const useAxiosObservation = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ observations, setObservations ] = useState<IObservation[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllObservations = async ( page?: number) => {
        try {
            const data = await getObservations( page );
            if ( data ) {
                setObservations( data.observations );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener las observaciones' );
        }
    }

    const createNewObservation = async ( user: IObservationDB ) => {
        try {
            const data = await createObservation( user );
            const status:number = data.status;
            const newObservation:IObservation = formatObservation( data.data.data );
            return { status, newObservation }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterObservations( page, filters );
            if (data.observations) {
                setObservations( data.observations );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener las observaciones' );
        }
    }

    const edit = async (id: number, user: IObservationDB) => {
        try {
            const data = await editObservation( id, user );
            const status:number = data.status;
            const editedObservation:IObservation = formatObservation( data.data.data );
            return { status, editedObservation }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        observations,
        loading,
        count,
        getAllObservations,
        createNewObservation,
        getFiltered,
        edit,
    }
}
