import { IArea, IAreaDB } from "../users/area";
import { ICompany, ICompanyDB } from "../users/company";
import { IUserDB, IUserDetail } from "../users/user";
import { IInspectionType, IInspectionTypeDB } from "./inspectionType";

export interface IInspection {
    key                         ?: number;
    id                          ?: number;
    userId                      : number;
    userModel                   ?: IUserDetail;
    userFullName                : string;
    userDni                     : string;
    userOccupation              ?: string;
    userSignature               ?: string;
    areaId                      ?: number;
    areaModel                   ?: IArea;
    areaName                    : string;
    zoneName                    : string;
    companyId                   ?: number;
    companyModel                ?: ICompany;
    companyName                 : string;
    companyAddress              ?: string;
    companyActivity             ?: string;
    companyRuc                  : string;
    companyTotalEmployees       ?: number;
    inspectionObjective         ?: string;
    datetime                    : Date;
    typeId                      : number;
    typeModel                   ?: IInspectionType;
    causesOfInfavourableResults ?: string;
    conclutions                 ?: string;
    recommendations             ?: string;
    observations                ?: string;
    state                       ?: string;
    createdAt                   ?: Date;
    updatedAt                   ?: Date;
}

export interface IInspectionDB {
    id                              ?: number;
    user_id                         : number;
    user_model                      ?: IUserDB;
    user_fullname                   : string;
    user_dni                        : string;
    user_occupation                 ?: string;
    user_signature                  ?: string;
    area_id                         ?: number;
    area_model                      ?: IAreaDB;
    area_name                       : string;
    zone_name                       : string;
    company_id                      ?: number;
    company_model                   ?: ICompanyDB;
    company_name                    : string;
    company_address                 ?: string;
    company_activity                ?: string;
    company_ruc                     : string;
    company_total_employees         ?: number;
    inspection_objective            ?: string;
    datetime                        : Date;
    type                            : number;
    type_model                      ?: IInspectionTypeDB;
    causes_of_infavourable_results  ?: string;
    conclutions                     ?: string;
    recommendations                 ?: string;
    observations                    ?: string;
    state                           ?: string;
    created                         ?: Date;
    modified                        ?: Date;
}