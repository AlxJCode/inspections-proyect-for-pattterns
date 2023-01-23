import axios from "axios";
import { IUserDB, IUserDetail } from "../../interfaces/users/user";
import { formatUser } from "../../utils/transforms";

export const getUsers = async ( page?: number, ) => {
    try {
        const response = await axios.get(`/users/users/${ page ? `?page=${page}`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const users:IUserDetail[] = data.map(( u:IUserDB ) => formatUser( u ));
        return { users, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterUsers = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/users/users/filters/${ page ? `?page=${page}`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const users:IUserDetail[] = data.map(( u:IUserDB ) => formatUser( u ));
        return { users, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createUser = async ( user:IUserDB ) => {
    try {
        const response = await axios.post('/users/users/', user);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editUser = async ( id:number, data: IUserDB ) => {
    try {
        const response = await axios.put(`/users/users/${id}/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}