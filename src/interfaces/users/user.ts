import { IArea, IAreaDB } from "./area";

export interface IUser {
    id              ?: number;
    name            : string;
    systemuser_id   ?: number;
    type            ?: string;
}

export interface IUserDetail extends IUser {
    key             ?: number;
    firstLastName   : string;
    secondLastName  : string;
    email           ?: string;
    phone           ?: string;
    dni             : string;
    areaId          ?: number;
    areaModel       ?: IArea;
    state           : boolean;
    createdAt       ?: Date;
    updatedAt       ?: Date;
}

export interface IUserDB {
    id              ?: number;
    auth_user       ?: number;
    name            : string;
    first_last_name : string;
    second_last_name: string;
    email           ?: string;
    type            ?: string;
    phone           ?: string;
    area_id          ?: number;
    area_model      ?: IAreaDB;
    dni             : string;
    state           :boolean;
    created         ?: Date;
    modified        ?: Date;
}