import { IUserDB, IUserDetail } from "../users/user";
import { IInspectionDetail, IInspectionDetailDB } from "./inspectionDetail";

export interface IInspectionDetailEvidence {
    id                      ?: number;
    inspectionDetailId      : number;
    inspectionDetailModel   ?: IInspectionDetail;
    userId                  : number;
    userModel               ?: IUserDetail;
    evidence                : string;
    percentage              : number;
    type                    : string;
    state                   : boolean;
    createdAt               ?: Date;
    updatedAt               ?: Date;
}

export interface IInspectionDetailEvidenceDB {
    id                      ?: number;
    inspection_detail_id    : number;
    inspection_detail_model ?: IInspectionDetailDB;
    user_id                 : number;
    user_model              ?: IUserDB;
    evidence                : string;
    percentage              : number;
    type                    : string;
    state                   : boolean;
    created                 ?: Date;
    modified                ?: Date;
}