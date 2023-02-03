import axios from "axios";
import { IObservationDetail, IObservationDetailDB } from "../../interfaces/observations/observationDetail";
import { formatObservationDetail } from "../../utils/transforms/observations/observationDetail";

export const getObservationDetails = async ( page?: number ) => {
    try {
        const response = await axios.get(`/observations/observation-details/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const observationDetails:IObservationDetail[] = data.map(( u:IObservationDetailDB, i:number ) => formatObservationDetail( u, i ));
        return { observationDetails, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterObservationDetails = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/observations/observation-details/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const observationDetails:IObservationDetail[] = data.map(( u:IObservationDetailDB, i:number ) => formatObservationDetail( u, i ));
        return { observationDetails, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createObservationDetail = async ( observationDetail:IObservationDetailDB ) => {
    try {
        const response = await axios.post('/observations/observation-details/', observationDetail);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editObservationDetail = async ( id:number, data: IObservationDetailDB ) => {
    try {
        const response = await axios.put(`/observations/observation-details/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}