import axios from "axios";
import Cookies from 'js-cookie';

const TOKEN_KEY = 'RRHH';

const UrlLocal  = "http://127.0.0.1:8000/api";
const UrlProd   = "https://inspecciones.ighgroup.com/api";

const Url = UrlLocal;

export const setToken = ( token:string ) => {
    localStorage.setItem(TOKEN_KEY, token);
    Cookies.set('token', token)
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    Cookies.remove('token');
};

export const initAxiosInterceptors = () => {
    axios.defaults.baseURL = Url;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.request.use((config:any) => {
        const token = getToken();
        if ( token ) {
            config.headers.Authorization = `Bearer ${getToken()}`;
        }
        return config;
    });
};