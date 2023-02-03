import { IUserDB, IUserDetail } from "../users/user";
import { IObservationDetail, IObservationDetailDB } from "./observationDetail";

export interface IObservationDetailResponsible {
    id                  ?: number;
    observationDetailId  : number;
    observationDetailModel?: IObservationDetail;
    userId              ?: number;
    userModel           ?: IUserDetail;
    userFullName        : string;
    userDni             : string;
    userPhone           ?: string;
    userEmail           ?: string;
    createdAt           ?: Date;
    updatedAt           ?: Date;
}

export interface IObservationDetailResponsibleDB {
    id                      ?: number;
    observation_detail_id    : number;
    observation_detail_model ?: IObservationDetailDB;
    user_id                 ?: number;
    user_model              ?: IUserDB;
    user_fullname           : string;
    user_dni                : string;
    user_phone              ?: string;
    user_email              ?: string;
    created                 ?: Date;
    modified                ?: Date;
}