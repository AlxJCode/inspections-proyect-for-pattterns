import axios from "axios";
import { IInspectionType, IInspectionTypeDB } from "../../interfaces/inspections/inspectionType";
import { formatInspectionType } from "../../utils/transforms/inspections/inspectionType";

export const getInspectionTypes = async ( page?: number ) => {
    try {
        const response = await axios.get(`/inspections/inspection-types/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionTypes:IInspectionType[] = data.map(( u:IInspectionTypeDB ) => formatInspectionType( u ));
        return { inspectionTypes, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterInspectionTypes = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/inspections/inspection-types/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionTypes:IInspectionType[] = data.map(( u:IInspectionTypeDB ) => formatInspectionType( u ));
        return { inspectionTypes, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createInspectionType = async ( inspectionType:IInspectionTypeDB ) => {
    try {
        const response = await axios.post('/inspections/inspection-types/', inspectionType);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editInspectionType = async ( id:number, data: IInspectionTypeDB ) => {
    try {
        const response = await axios.put(`/inspections/inspection-types/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}