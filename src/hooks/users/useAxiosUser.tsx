import { message } from "antd";
import { useState } from "react";
import { IUser, IUserDB, IUserDetail } from "../../interfaces/users/user";
import { createUser, editUser, getFilterUsers, getUsers } from "../../services";
import { formatUser } from "../../utils/transforms";

export const useAxiosUser = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ users, setUsers ] = useState<IUserDetail[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllUsers = async ( page?: number) => {
        try {
            const data = await getUsers( page );
            if ( data ) {
                setUsers( data.users );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los usuarios' );
        }
    }

    const createNewUser = async ( user: IUserDB ) => {
        try {
            const data = await createUser( user );
            const status:number = data.status;
            const newUser:IUser = formatUser( data.data.data );
            return { status, newUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterUsers( page, filters );
            if (data.users) {
                setUsers( data.users );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los usuarios' );
        }
    }


    const edit = async (id: number, user: IUserDB) => {
        try {
            const data = await editUser( id, user );
            const status:number = data.status;
            const editedUser:IUser = formatUser( data.data.data );
            return { status, editedUser }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        users,
        loading,
        count,
        getAllUsers,
        createNewUser,
        getFiltered,
        edit,
    }
}
