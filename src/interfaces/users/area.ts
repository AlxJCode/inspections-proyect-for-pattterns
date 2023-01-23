import { ICompany, ICompanyDB } from "./company";

export interface IArea {
    key         ?: number;
    id          ?: number;
    companyId   : number;
    companyModel?: ICompany;
    name        : string;
    state       : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IAreaDB {
    id              ?: number;
    company_id      : number;
    name            : string;
    company_model   ?: ICompanyDB;
    state           : boolean;
    created         ?: Date;
    modified        ?: Date;
}