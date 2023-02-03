import { IUserDB, IUserDetail } from "../users/user";
import { IObservation, IObservationDB } from "./observation";

export interface IObservationUser {
    id                  ?: number;
    userId              : number;
    userModel           ?:IUserDetail;
    fullName            : string;
    observationId       : number;
    observationModel    ?: IObservation;
    type                : string;
    dni                 : string;
    occupation          ?: string;
    experience          ?: string;
    createdAt           ?: Date;
    updatedAt           ?: Date;
}

export interface IObservationUserDB {
    id                  ?: number;
    user_id             : number;
    user_model          ?:IUserDB;
    user_fullname       : string;
    observation_id      : number;
    observation_model?  : IObservationDB;
    type                : string;
    dni                 : string;
    occupation          ?: string;
    experience          ?: string;
    created             ?: Date;
    modified            ?: Date;
}