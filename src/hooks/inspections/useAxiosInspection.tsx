import { message } from "antd";
import { useState } from "react";
import { IInspection, IInspectionDB } from "../../interfaces/inspections/inspection";
import { createInspection, editInspection, getFilterInspections, getInspections } from "../../services";
import { formatInspection } from "../../utils/transforms/inspections/inspection";

export const useAxiosInspection = ( ) => {


    const [ loading, setLoading ] = useState( false );
    const [ inspections, setInspections ] = useState<IInspection[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllInspections = async ( page?: number) => {
        try {
            const data = await getInspections( page );
            if ( data ) {
                setInspections( data.inspections );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener las inspecciones' );
        }
    }

    const createNewInspection = async ( user: IInspectionDB ) => {
        try {
            const data = await createInspection( user );
            const status:number = data.status;
            const newInspection:IInspection = formatInspection( data.data.data );
            return { status, newInspection }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterInspections( page, filters );
            if (data.inspections) {
                setInspections( data.inspections );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener las inspecciones' );
        }
    }

    const edit = async (id: number, user: IInspectionDB) => {
        try {
            const data = await editInspection( id, user );
            const status:number = data.status;
            const editedInspection:IInspection = formatInspection( data.data.data );
            return { status, editedInspection }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        inspections,
        loading,
        count,
        getAllInspections,
        createNewInspection,
        getFiltered,
        edit,
    }
}
