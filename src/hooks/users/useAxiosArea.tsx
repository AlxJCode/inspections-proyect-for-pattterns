import { message } from "antd";
import { useState } from "react";
import { IArea, IAreaDB } from "../../interfaces/users/area";
import { createArea, editArea, getFilterAreas, getAreas } from "../../services";
import { formatArea } from "../../utils/transforms";

export const useAxiosArea = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ areas, setAreas ] = useState<IArea[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllAreas = async ( page?: number) => {
        try {
            const data = await getAreas( page );
            if ( data ) {
                setAreas( data.areas );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los áreas' );
        }
    }

    const createNewArea = async ( user: IAreaDB ) => {
        try {
            const data = await createArea( user );
            const status:number = data.status;
            const newArea:IArea = formatArea( data.data.data );
            return { status, newArea }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterAreas( page, filters );
            if (data.areas) {
                setAreas( data.areas );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los áreas' );
        }
    }

    const edit = async (id: number, user: IAreaDB) => {
        try {
            const data = await editArea( id, user );
            const status:number = data.status;
            const editedArea:IArea = formatArea( data.data.data );
            return { status, editedArea }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        areas,
        loading,
        count,
        getAllAreas,
        createNewArea,
        getFiltered,
        edit,
    }
}
