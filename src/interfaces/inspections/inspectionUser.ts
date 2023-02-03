import { IUserDB, IUserDetail } from "../users/user";
import { IInspection, IInspectionDB } from "./inspection";

export interface IInspectionUser {
    id              ?: number;
    userId          : number;
    userModel       ?:IUserDetail;
    fullName        : string;
    inspectionId    : number;
    inspectionModel ?: IInspection;
    type            : string;
    dni             : string;
    occupation      ?: string;
    experience      ?: string;
    createdAt       ?: Date;
    updatedAt       ?: Date;
}

export interface IInspectionUserDB {
    id              ?: number;
    user_id         : number;
    user_fullname   : string;
    user_model      ?:IUserDB;
    inspection_id   : number;
    inspection_model?: IInspectionDB;
    type            : string;
    dni             : string;
    occupation      ?: string;
    experience      ?: string;
    created         ?: Date;
    modified        ?: Date;
}