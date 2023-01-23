export interface ICompany {
    key             ?: number;
    id              ?: number;
    name            : string;
    ruc             : string;
    economicActivity: string;
    address         ?: string;
    state           : boolean;
    createdAt       ?: Date;
    updatedAt       ?: Date;
}

export interface ICompanyDB {
    id                  ?: number;
    name                : string;
    ruc                 : string;
    economic_activity   : string;
    address             ?: string;
    state               : boolean;
    created             ?: Date;
    modified            ?: Date;
}