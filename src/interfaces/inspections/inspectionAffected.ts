export interface IInspectionAffected {
    id          ?: number;
    name        : string;
    category    ?: string;
    code        ?: string;
    state       : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IInspectionAffectedDB {
    id          ?: number;
    name        : string;
    category    ?: string;
    code        ?: string;
    state       : boolean;
    created     ?: Date;
    modified    ?: Date;
}