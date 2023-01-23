import { message } from "antd";
import { useState } from "react";
import { ICompany, ICompanyDB } from "../../interfaces/users/company";
import { createCompany, editCompany, getFilterCompanies, getCompanies } from "../../services";
import { formatCompany } from "../../utils/transforms";

export const useAxiosCompany = ( ) => {


    const [ loading, setLoading ] = useState( true );
    const [ companies, setCompanys ] = useState<ICompany[]>([]);
    const [ count, setCount ] = useState( 0 );


    const getAllCompanys = async ( page?: number) => {
        try {
            const data = await getCompanies( page );
            if ( data ) {
                setCompanys( data.companies );
                setCount( data.count || 0 );
            }
        } catch ( error ) {
            console.log( error );
            message.error( 'No se pudo obtener las empresas' );
        }
    }

    const createNewCompany = async ( user: ICompanyDB ) => {
        try {
            const data = await createCompany( user );
            const status:number = data.status;
            const newCompany:ICompany = formatCompany( data.data.data );
            return { status, newCompany }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al crear, revise los campos');
            return { status: error.response.status || 400 };
        }
    }

    const getFiltered = async ( filters={}, page ?: number ) => {
        setLoading( true );
        try {
            const data = await getFilterCompanies( page, filters );
            if ( data.companies ) {
                setCompanys( data.companies );
                setCount( data.count || 0 );
                setLoading( false );
            }
        } catch ( error ) {
            console.log( error );
            setLoading( false );
            message.error( 'No se pudo obtener las empresas' );
        }
    }

    const edit = async (id: number, user: ICompanyDB) => {
        try {
            const data = await editCompany( id, user );
            const status:number = data.status;
            const editedCompany:ICompany = formatCompany( data.data.data );
            return { status, editedCompany }
        } catch ( error: any ) {
            console.log( error );
            message.error('Error al editar, revise los campos');
            return { status: error.response.status || 400 };
        }
    }


    return {
        companies,
        loading,
        count,
        getAllCompanys,
        createNewCompany,
        getFiltered,
        edit,
    }
}
