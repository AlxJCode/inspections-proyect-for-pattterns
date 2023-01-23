import { jwtVerify, importPKCS8 } from "jose";
import axios from "axios";
import { IUser } from "../interfaces/users/user";

export const isValidToken = (token: string, backend=false): Promise<IUser | any > => {

    let SECRET = process.env.NEXT_PUBLIC_SECRET_KEY;
    if ( backend ) {
        SECRET = process.env.SECRET_KEY;
    }

    if ( !SECRET ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    if ( token.length <= 10 ) {
        return Promise.reject('JWT no es válido < 10');
    }

    return new Promise(async(resolve, reject) => {

        try {
            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode( SECRET ),
            );
            resolve( payload );
        } catch (error) {
            console.log( "Error", error );
            reject('JWT no es válido');
        }
    });

}

export const isValidTokenAPI = async ( token: string ) => {
    try {
        const response = await axios.get('/auth/verify/');
        console.log("Response", response);
        const { user } = response.data.data;
        return user;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}