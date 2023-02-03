import axios from "axios";
import { IObservationAnswer, IObservationAnswerDB } from "../../interfaces/observations/observationAnswer";
import { formatObservationAnswer } from "../../utils/transforms/observations/observationAnswer";

export const getObservationAnswers = async ( page?: number ) => {
    try {
        const response = await axios.get(`/observations/observation-answers/${ page ? `?page=${ page }`: `` }`);
        const { data } = response.data;
        const count:number = response.data.count;
        const observationAnswers:IObservationAnswer[] = data.map(( u:IObservationAnswerDB ) => formatObservationAnswer( u ));
        return { observationAnswers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const getFilterObservationAnswers = async ( page?: number, filters = {} ) => {
    try {
        const response = await axios.post( `/observations/observation-answers/filters/${ page ? `?page=${ page }`: `` }`, filters );
        const { data } = response.data;
        const count:number = response.data.count;
        const observationAnswers:IObservationAnswer[] = data.map(( u:IObservationAnswerDB ) => formatObservationAnswer( u ));
        return { observationAnswers, count };
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const createObservationAnswer = async ( observationAnswer:IObservationAnswerDB ) => {
    try {
        const response = await axios.post('/observations/observation-answers/', observationAnswer);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}

export const editObservationAnswer = async ( id:number, data: IObservationAnswerDB ) => {
    try {
        const response = await axios.put(`/observations/observation-answers/${ id }/`, data);
        return response;
    } catch ( error ) {
        return Promise.reject( error );
    }
}