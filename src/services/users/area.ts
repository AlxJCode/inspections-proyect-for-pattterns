import axios from "axios";
import { IAreaDB, IArea } from "../../interfaces/users/area";
import { formatArea } from "../../utils/transforms";

export const getAreas = async ( page?: number ) => {
    try {
        const response = await axios.get(`/users/areas/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const areas:IArea[] = data.map(( u:IAreaDB ) => formatArea( u ));
        return { areas, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterAreas = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/users/areas/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const areas:IArea[] = data.map(( u:IAreaDB ) => formatArea( u ));
        return { areas, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createArea = async ( user:IAreaDB ) => {
    try {
        const response = await axios.post('/users/areas/', user);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editArea = async ( id:number, data: IAreaDB ) => {
    try {
        const response = await axios.put(`/users/areas/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}