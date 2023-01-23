import axios from "axios";
import { IInspection, IInspectionDB } from "../../interfaces/inspections/inspection";
import { formatInspection } from "../../utils/transforms/inspections/inspection";

export const getInspections = async ( page?: number ) => {
    try {
        const response = await axios.get(`/inspections/inspections/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const inspections:IInspection[] = data.map(( u:IInspectionDB ) => formatInspection( u ));
        return { inspections, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterInspections = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/inspections/inspections/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const inspections:IInspection[] = data.map(( u:IInspectionDB ) => formatInspection( u ));
        return { inspections, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createInspection = async ( inspection:IInspectionDB ) => {
    try {
        const response = await axios.post('/inspections/inspections/', inspection);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editInspection = async ( id:number, data: IInspectionDB ) => {
    try {
        const response = await axios.put(`/inspections/inspections/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}