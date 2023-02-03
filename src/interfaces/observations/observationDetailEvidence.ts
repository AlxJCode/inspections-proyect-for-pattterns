import { IUserDB, IUserDetail } from "../users/user";
import { IObservationDetail, IObservationDetailDB } from "./observationDetail";

export interface IObservationDetailEvidence {
    id                      ?: number;
    observationDetailId      : number;
    observationDetailModel   ?: IObservationDetail;
    userId                  : number;
    userModel               ?: IUserDetail;
    evidence                : string;
    percentage              : number;
    type                    : string;
    state                   : boolean;
    createdAt               ?: Date;
    updatedAt               ?: Date;
}

export interface IObservationDetailEvidenceDB {
    id                      ?: number;
    observation_detail_id    : number;
    observation_detail_model ?: IObservationDetailDB;
    user_id                 : number;
    user_model              ?: IUserDB;
    evidence                : string;
    percentage              : number;
    type                    : string;
    state                   : boolean;
    created                 ?: Date;
    modified                ?: Date;
}