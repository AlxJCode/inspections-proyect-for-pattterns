import axios from "axios";
import { IObservationUser, IObservationUserDB } from "../../interfaces/observations/observationUser";
import { formatObservationUser } from "../../utils/transforms/observations/observationUser";

export const getObservationUsers = async ( page?: number ) => {
    try {
        const response = await axios.get(`/observations/observation-users/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const observationUsers:IObservationUser[] = data.map(( u:IObservationUserDB ) => formatObservationUser( u ));
        console.log( "XD", observationUsers );
        return { observationUsers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterObservationUsers = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/observations/observation-users/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const observationUsers:IObservationUser[] = data.map(( u:IObservationUserDB ) => formatObservationUser( u ));
        return { observationUsers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createObservationUser = async ( observationUser:IObservationUserDB ) => {
    try {
        const response = await axios.post('/observations/observation-users/', observationUser);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editObservationUser = async ( id:number, data: IObservationUserDB ) => {
    try {
        const response = await axios.put(`/observations/observation-users/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}