export interface IObservationAffected {
    id          ?: number;
    name        : string;
    category    ?: string;
    code        ?: string;
    state       : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IObservationAffectedDB {
    id          ?: number;
    name        : string;
    category    ?: string;
    code        ?: string;
    state       : boolean;
    created     ?: Date;
    modified    ?: Date;
}