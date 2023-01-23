import { message } from "antd";
import { useState } from "react";
import { IInspectionType, IInspectionTypeDB } from "../../interfaces/inspections/inspectionType";
import { createInspectionType, editInspectionType, getFilterInspectionTypes, getInspectionTypes } from "../../services";
import { formatInspectionType } from "../../utils/transforms/inspections/inspectionType";

export const useAxiosInspectionType = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ inspectionTypes, setInspectionTypes ] = useState<IInspectionType[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllInspectionTypes = async ( page?: number) => {
        try {
            const data = await getInspectionTypes( page );
            if ( data ) {
                setInspectionTypes( data.inspectionTypes );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los tipos de inspecciones' );
        }
    }

    const createNewInspectionType = async ( user: IInspectionTypeDB ) => {
        try {
            const data = await createInspectionType( user );
            const status:number = data.status;
            const newInspectionType:IInspectionType = formatInspectionType( data.data.data );
            return { status, newInspectionType }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterInspectionTypes( page, filters );
            if (data.inspectionTypes) {
                setInspectionTypes( data.inspectionTypes );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los tipos de inspecciones' );
        }
    }

    const edit = async (id: number, user: IInspectionTypeDB) => {
        try {
            const data = await editInspectionType( id, user );
            const status:number = data.status;
            const editedInspectionType:IInspectionType = formatInspectionType( data.data.data );
            return { status, editedInspectionType }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        inspectionTypes,
        loading,
        count,
        getAllInspectionTypes,
        createNewInspectionType,
        getFiltered,
        edit,
    }
}
