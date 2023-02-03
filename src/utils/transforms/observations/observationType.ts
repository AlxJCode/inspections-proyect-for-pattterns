import { IObservationType, IObservationTypeDB } from "../../../interfaces/observations/observationType";

export const formatObservationType = ( observationType: IObservationTypeDB ) => {
    const formatedObservationType: IObservationType = {
        id              : observationType.id,
        name            : observationType.name,
        subtype         : observationType.subtype,
        createdAt       : observationType.created,
        updatedAt       : observationType.modified,
    }
    return formatedObservationType;
}
export const observationTypeToJson = ( observationType: IObservationType ) => {
    const formatedObservationType: IObservationTypeDB = {
        id                  : observationType.id,
        name                : observationType.name,
        subtype             : observationType.subtype,
        created             : observationType.createdAt,
        modified            : observationType.updatedAt,
    }
    return formatedObservationType;
}