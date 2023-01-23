import { IUserDB, IUserDetail } from "../users/user";
import { IInspectionDetail, IInspectionDetailDB } from "./inspectionDetail";

export interface IInspectionDetailResponsible {
    id                  ?: number;
    inspectionDetailId  : number;
    inspectionDetailModel?: IInspectionDetail;
    userId              ?: number;
    userModel           ?: IUserDetail;
    userFullName        : string;
    userDni             : string;
    userPhone           ?: string;
    userEmail           ?: string;
    createdAt           ?: Date;
    updatedAt           ?: Date;
}

export interface IInspectionDetailResponsibleDB {
    id                      ?: number;
    inspection_detail_id    : number;
    inspection_detail_model ?: IInspectionDetailDB;
    user_id                 ?: number;
    user_model              ?: IUserDB;
    user_fullname           : string;
    user_dni                : string;
    user_phone              ?: string;
    user_email              ?: string;
    created                 ?: Date;
    modified                ?: Date;
}