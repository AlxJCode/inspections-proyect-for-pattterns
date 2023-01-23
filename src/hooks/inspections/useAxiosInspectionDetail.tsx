import { message } from "antd";
import { useState } from "react";
import { IInspectionDetail, IInspectionDetailDB } from "../../interfaces/inspections/inspectionDetail";
import { createInspectionDetail, editInspectionDetail, getFilterInspectionDetails, getInspectionDetails } from "../../services";
import { formatInspectionDetail } from "../../utils/transforms/inspections/inspectionDetail";

export const useAxiosInspectionDetail = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ inspectionDetails, setInspectionDetails ] = useState<IInspectionDetail[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllInspectionDetails = async ( page?: number) => {
        try {
            const data = await getInspectionDetails( page );
            if ( data ) {
                setInspectionDetails( data.inspectionDetails );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener los detalles de inspecciones' );
        }
    }

    const createNewInspectionDetail = async ( user: IInspectionDetailDB ) => {
        try {
            const data = await createInspectionDetail( user );
            const status:number = data.status;
            const newInspectionDetail:IInspectionDetail = formatInspectionDetail( data.data.data );
            return { status, newInspectionDetail }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterInspectionDetails( page, filters );
            if (data.inspectionDetails) {
                setInspectionDetails( data.inspectionDetails );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener los detalles de inspecciones' );
        }
    }

    const edit = async (id: number, user: IInspectionDetailDB) => {
        try {
            const data = await editInspectionDetail( id, user );
            const status:number = data.status;
            const editedInspectionDetail:IInspectionDetail = formatInspectionDetail( data.data.data );
            return { status, editedInspectionDetail }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        inspectionDetails,
        loading,
        count,
        getAllInspectionDetails,
        createNewInspectionDetail,
        getFiltered,
        edit,
    }
}
