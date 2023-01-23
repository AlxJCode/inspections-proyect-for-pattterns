import axios from "axios";
import { ICompanyDB, ICompany } from "../../interfaces/users/company";
import { formatCompany } from "../../utils/transforms";

export const getCompanies = async ( page?: number ) => {
    try {
        const response = await axios.get(`/users/companies/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const companies:ICompany[] = data.map(( u:ICompanyDB ) => formatCompany( u ));
        return { companies, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterCompanies = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/users/companies/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const companies:ICompany[] = data.map(( u:ICompanyDB ) => formatCompany( u ));
        return { companies, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createCompany = async ( user:ICompanyDB ) => {
    try {
        const response = await axios.post('/users/companies/', user);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editCompany = async ( id:number, data: ICompanyDB ) => {
    try {
        const response = await axios.put(`/users/companies/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}