import axios from "axios";
import { IObservation, IObservationDB } from "../../interfaces/observations/observation";
import { formatObservation } from "../../utils/transforms/observations/observation";

export const getObservations = async ( page?: number ) => {
    try {
        const response = await axios.get(`/observations/observations/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const observations:IObservation[] = data.map(( u:IObservationDB ) => formatObservation( u ));
        return { observations, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterObservations = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/observations/observations/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const observations:IObservation[] = data.map(( u:IObservationDB ) => formatObservation( u ));
        return { observations, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createObservation = async ( observation:IObservationDB ) => {
    try {
        const response = await axios.post('/observations/observations/', observation);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editObservation = async ( id:number, data: IObservationDB ) => {
    try {
        const response = await axios.put(`/observations/observations/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}