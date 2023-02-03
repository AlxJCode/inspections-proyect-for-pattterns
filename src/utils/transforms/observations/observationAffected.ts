import { IObservationAffected, IObservationAffectedDB } from "../../../interfaces/observations/observationAffected";

export const formatObservationAffected = ( observationAffected: IObservationAffectedDB ) => {
    const formatedObservationAffected: IObservationAffected = {
        id          : observationAffected.id,
        name        : observationAffected.name,
        category    : observationAffected.category,
        code        : observationAffected.code,
        state       : observationAffected.state,
        createdAt   : observationAffected.created,
        updatedAt   : observationAffected.modified,
    }
    return formatedObservationAffected;
}
export const observationAffectedToJson = ( observationAffected: IObservationAffected ) => {
    const formatedObservationAffected: IObservationAffectedDB = {
        id          : observationAffected.id,
        name        : observationAffected.name,
        category    : observationAffected.category,
        code        : observationAffected.code,
        state       : observationAffected.state,
        created     : observationAffected.createdAt,
        modified    : observationAffected.updatedAt,
    }
    return formatedObservationAffected;
}