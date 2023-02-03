export interface IObservationType {
    id          ?: number;
    name        : string;
    subtype     : string;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IObservationTypeDB {
    id          ?: number;
    name        : string;
    subtype     : string;
    created     ?: Date;
    modified    ?: Date;
}