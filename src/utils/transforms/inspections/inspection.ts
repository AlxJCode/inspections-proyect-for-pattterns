import { IInspection, IInspectionDB } from "../../../interfaces/inspections/inspection";
import { formatArea } from "../users/area";
import { formatCompany } from "../users/company";
import { formatUser } from "../users/user";
import { formatInspectionType } from "./inspectionType";


export const formatInspection = (inspection: IInspectionDB) => {
    const formatedInspection: IInspection = {
        key                         : inspection.id,
        id                          : inspection.id,
        userId                      : inspection.user_id,
        userModel                   : inspection.user_model && formatUser( inspection.user_model ),
        userFullName                : inspection.user_fullname,
        userDni                     : inspection.user_dni,
        userOccupation              : inspection.user_occupation,
        userSignature               : inspection.user_signature,
        areaId                      : inspection.area_id,
        areaModel                   : inspection.area_model && formatArea( inspection.area_model ),
        areaName                    : inspection.area_name,
        zoneName                    : inspection.zone_name,
        companyId                   : inspection.company_id,
        companyModel                : inspection.company_model && formatCompany( inspection.company_model ),
        companyName                 : inspection.company_name,
        companyAddress              : inspection.company_address,
        companyActivity             : inspection.company_activity,
        companyRuc                  : inspection.company_ruc,
        companyTotalEmployees       : inspection.company_total_employees,
        inspectionObjective         : inspection.inspection_objective,
        datetime                    : inspection.datetime,
        typeId                      : inspection.type,
        typeModel                   : inspection.type_model && formatInspectionType( inspection.type_model ),
        causesOfInfavourableResults : inspection.causes_of_infavourable_results,
        conclutions                 : inspection.conclutions,
        recommendations             : inspection.recommendations,
        observations                : inspection.observations,
        state                       : inspection.state,
        createdAt                   : inspection.created,
        updatedAt                   : inspection.modified,
    }
    return formatedInspection;
}
export const inspectionToJson = (inspection: IInspection) => {
    const formatedInspection: IInspectionDB = {
        id                              : inspection.id,
        user_id                         : inspection.userId,
        user_fullname                   : inspection.userFullName,
        user_dni                        : inspection.userDni,
        user_occupation                 : inspection.userOccupation,
        user_signature                  : inspection.userSignature,
        area_id                         : inspection.areaId,
        area_name                       : inspection.areaName,
        zone_name                       : inspection.zoneName,
        company_id                      : inspection.companyId,
        company_name                    : inspection.companyName,
        company_address                 : inspection.companyAddress,
        company_activity                : inspection.companyActivity,
        company_ruc                     : inspection.companyRuc,
        company_total_employees         : inspection.companyTotalEmployees,
        inspection_objective            : inspection.inspectionObjective,
        datetime                        : inspection.datetime,
        type                            : inspection.typeId,
        causes_of_infavourable_results  : inspection.causesOfInfavourableResults,
        conclutions                     : inspection.conclutions,
        recommendations                 : inspection.recommendations,
        observations                    : inspection.observations,
        state                           : inspection.state,
        created                         : inspection.createdAt,
        modified                        : inspection.updatedAt,
    }
    return formatedInspection;
}