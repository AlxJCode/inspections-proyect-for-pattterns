import axios from "axios";
import { IInspectionDetail, IInspectionDetailDB } from "../../interfaces/inspections/inspectionDetail";
import { formatInspectionDetail } from "../../utils/transforms/inspections/inspectionDetail";

export const getInspectionDetails = async ( page?: number ) => {
    try {
        const response = await axios.get(`/inspections/inspection-details/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionDetails:IInspectionDetail[] = data.map(( u:IInspectionDetailDB, i:number ) => formatInspectionDetail( u, i ));
        return { inspectionDetails, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterInspectionDetails = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/inspections/inspection-details/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const inspectionDetails:IInspectionDetail[] = data.map(( u:IInspectionDetailDB, i:number ) => formatInspectionDetail( u, i ));
        return { inspectionDetails, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createInspectionDetail = async ( inspectionDetail:IInspectionDetailDB ) => {
    try {
        const response = await axios.post('/inspections/inspection-details/', inspectionDetail);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editInspectionDetail = async ( id:number, data: IInspectionDetailDB ) => {
    try {
        const response = await axios.put(`/inspections/inspection-details/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}