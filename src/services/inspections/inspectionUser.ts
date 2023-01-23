import axios from "axios";
import { IInspectionUser, IInspectionUserDB } from "../../interfaces/inspections/inspectionUser";
import { formatInspectionUser } from "../../utils/transforms/inspections/inspectionUser";

export const getInspectionUsers = async ( page?: number ) => {
    try {
        const response = await axios.get(`/inspections/inspection-users/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionUsers:IInspectionUser[] = data.map(( u:IInspectionUserDB ) => formatInspectionUser( u ));
        console.log( "XD", inspectionUsers );
        return { inspectionUsers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterInspectionUsers = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/inspections/inspection-users/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionUsers:IInspectionUser[] = data.map(( u:IInspectionUserDB ) => formatInspectionUser( u ));
        return { inspectionUsers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createInspectionUser = async ( inspectionUser:IInspectionUserDB ) => {
    try {
        const response = await axios.post('/inspections/inspection-users/', inspectionUser);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editInspectionUser = async ( id:number, data: IInspectionUserDB ) => {
    try {
        const response = await axios.put(`/inspections/inspection-users/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}