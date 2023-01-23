export interface IInspectionType {
    id          ?: number;
    name        : string;
    subtype     : string;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IInspectionTypeDB {
    id          ?: number;
    name        : string;
    subtype     : string;
    created     ?: Date;
    modified    ?: Date;
}