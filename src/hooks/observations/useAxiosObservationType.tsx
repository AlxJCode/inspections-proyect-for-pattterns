import { message } from "antd";
import { useState } from "react";
import { IObservationType, IObservationTypeDB } from "../../interfaces/observations/observationType";
import { createObservationType, editObservationType, getFilterObservationTypes, getObservationTypes } from "../../services";
import { formatObservationType } from "../../utils/transforms/observations/observationType";

export const useAxiosObservationType = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ observationTypes, setObservationTypes ] = useState<IObservationType[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllObservationTypes = async ( page?: number) => {
        try {
            const data = await getObservationTypes( page );
            if ( data ) {
                setObservationTypes( data.observationTypes );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los tipos de observaciones' );
        }
    }

    const createNewObservationType = async ( user: IObservationTypeDB ) => {
        try {
            const data = await createObservationType( user );
            const status:number = data.status;
            const newObservationType:IObservationType = formatObservationType( data.data.data );
            return { status, newObservationType }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterObservationTypes( page, filters );
            if (data.observationTypes) {
                setObservationTypes( data.observationTypes );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los tipos de observaciones' );
        }
    }

    const edit = async (id: number, user: IObservationTypeDB) => {
        try {
            const data = await editObservationType( id, user );
            const status:number = data.status;
            const editedObservationType:IObservationType = formatObservationType( data.data.data );
            return { status, editedObservationType }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        observationTypes,
        loading,
        count,
        getAllObservationTypes,
        createNewObservationType,
        getFiltered,
        edit,
    }
}
