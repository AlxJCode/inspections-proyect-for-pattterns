import { message } from "antd";
import { useState } from "react";
import { IInspectionUser, IInspectionUserDB } from "../../interfaces/inspections/inspectionUser";
import { createInspectionUser, editInspectionUser, getFilterInspectionUsers, getInspectionUsers } from "../../services";
import { formatInspectionUser } from "../../utils/transforms/inspections/inspectionUser";

export const useAxiosInspectionUser = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ inspectionUsers, setInspectionUsers ] = useState<IInspectionUser[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllInspectionUsers = async ( page?: number) => {
        try {
            const data = await getInspectionUsers( page );
            if ( data ) {
                setInspectionUsers( data.inspectionUsers );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los usuarios de inspecciones' );
        }
    }

    const createNewInspectionUser = async ( user: IInspectionUserDB ) => {
        try {
            const data = await createInspectionUser( user );
            const status:number = data.status;
            const newInspectionUser:IInspectionUser = formatInspectionUser( data.data.data );
            return { status, newInspectionUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterInspectionUsers( page, filters );
            if (data.inspectionUsers) {
                setInspectionUsers( data.inspectionUsers );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los usuarios de inspecciones' );
        }
    }

    const edit = async (id: number, user: IInspectionUserDB) => {
        try {
            const data = await editInspectionUser( id, user );
            const status:number = data.status;
            const editedInspectionUser:IInspectionUser = formatInspectionUser( data.data.data );
            return { status, editedInspectionUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        inspectionUsers,
        loading,
        count,
        getAllInspectionUsers,
        createNewInspectionUser,
        getFiltered,
        edit,
    }
}
