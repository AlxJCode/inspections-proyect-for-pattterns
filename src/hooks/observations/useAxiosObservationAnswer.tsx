import { message } from "antd";
import { useState } from "react";
import { IObservationAnswer, IObservationAnswerDB } from "../../interfaces/observations/observationAnswer";
import { createObservationAnswer, editObservationAnswer, getFilterObservationAnswers, getObservationAnswers } from "../../services";
import { formatObservationAnswer } from "../../utils/transforms/observations/observationAnswer";

export const useAxiosObservationAnswer = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ observationAnswers, setObservationAnswers ] = useState<IObservationAnswer[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllObservationAnswers = async ( page?: number) => {
        try {
            const data = await getObservationAnswers( page );
            if ( data ) {
                setObservationAnswers( data.observationAnswers );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener las respuestas de observaciones' );
        }
    }

    const createNewObservationAnswer = async ( user: IObservationAnswerDB ) => {
        try {
            const data = await createObservationAnswer( user );
            const status:number = data.status;
            const newObservationAnswer:IObservationAnswer = formatObservationAnswer( data.data.data );
            return { status, newObservationAnswer }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterObservationAnswers( page, filters );
            if (data.observationAnswers) {
                setObservationAnswers( data.observationAnswers );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener las respuestas de obsevaciones' );
        }
    }

    const edit = async (id: number, user: IObservationAnswerDB) => {
        try {
            const data = await editObservationAnswer( id, user );
            const status:number = data.status;
            const editedObservationAnswer:IObservationAnswer = formatObservationAnswer( data.data.data );
            return { status, editedObservationAnswer }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        observationAnswers,
        loading,
        count,
        getAllObservationAnswers,
        createNewObservationAnswer,
        getFiltered,
        edit,
    }
}
