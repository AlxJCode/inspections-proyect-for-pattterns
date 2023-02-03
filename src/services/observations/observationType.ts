import axios from "axios";
import { IObservationType, IObservationTypeDB } from "../../interfaces/observations/observationType";
import { formatObservationType } from "../../utils/transforms/observations/observationType";

export const getObservationTypes = async ( page?: number ) => {
    try {
        const response = await axios.get(`/observations/observation-types/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const observationTypes:IObservationType[] = data.map(( u:IObservationTypeDB ) => formatObservationType( u ));
        return { observationTypes, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterObservationTypes = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/observations/observation-types/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const observationTypes:IObservationType[] = data.map(( u:IObservationTypeDB ) => formatObservationType( u ));
        return { observationTypes, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createObservationType = async ( observationType:IObservationTypeDB ) => {
    try {
        const response = await axios.post('/observations/observation-types/', observationType);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editObservationType = async ( id:number, data: IObservationTypeDB ) => {
    try {
        const response = await axios.put(`/observations/observation-types/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}