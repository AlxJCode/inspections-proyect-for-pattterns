import { message } from "antd";
import { useState } from "react";
import { IObservationUser, IObservationUserDB } from "../../interfaces/observations/observationUser";
import { createObservationUser, editObservationUser, getFilterObservationUsers, getObservationUsers } from "../../services";
import { formatObservationUser } from "../../utils/transforms/observations/observationUser";

export const useAxiosObservationUser = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ observationUsers, setObservationUsers ] = useState<IObservationUser[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllObservationUsers = async ( page?: number) => {
        try {
            const data = await getObservationUsers( page );
            if ( data ) {
                setObservationUsers( data.observationUsers );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los usuarios de observaciones' );
        }
    }

    const createNewObservationUser = async ( user: IObservationUserDB ) => {
        try {
            const data = await createObservationUser( user );
            const status:number = data.status;
            const newObservationUser:IObservationUser = formatObservationUser( data.data.data );
            return { status, newObservationUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterObservationUsers( page, filters );
            if (data.observationUsers) {
                setObservationUsers( data.observationUsers );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los usuarios de observaciones' );
        }
    }

    const edit = async (id: number, user: IObservationUserDB) => {
        try {
            const data = await editObservationUser( id, user );
            const status:number = data.status;
            const editedObservationUser:IObservationUser = formatObservationUser( data.data.data );
            return { status, editedObservationUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        observationUsers,
        loading,
        count,
        getAllObservationUsers,
        createNewObservationUser,
        getFiltered,
        edit,
    }
}
