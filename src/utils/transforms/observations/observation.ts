import { IObservation, IObservationDB } from "../../../interfaces/observations/observation";
import { formatArea } from "../users/area";
import { formatCompany } from "../users/company";
import { formatUser } from "../users/user";
import { formatObservationType } from "./observationType";


export const formatObservation = (observation: IObservationDB) => {
    const formatedObservation: IObservation = {
        key                         : observation.id,
        id                          : observation.id,
        userId                      : observation.user_id,
        userModel                   : observation.user_model && formatUser( observation.user_model ),
        userFullName                : observation.user_fullname,
        userDni                     : observation.user_dni,
        userOccupation              : observation.user_occupation,
        userSignature               : observation.user_signature,
        areaId                      : observation.area_id,
        areaModel                   : observation.area_model && formatArea( observation.area_model ),
        areaName                    : observation.area_name,
        zoneName                    : observation.zone_name,
        companyId                   : observation.company_id,
        companyModel                : observation.company_model && formatCompany( observation.company_model ),
        companyName                 : observation.company_name,
        companyAddress              : observation.company_address,
        companyActivity             : observation.company_activity,
        companyRuc                  : observation.company_ruc,
        companyTotalEmployees       : observation.company_total_employees,
        observationObjective         : observation.observation_objective,
        taskName                    : observation.task_name,
        petCode                     : observation.pet_code,
        guard                       : observation.guard,
        datetime                    : observation.datetime,
        typeId                      : observation.type,
        typeModel                   : observation.type_model && formatObservationType( observation.type_model ),
        causesOfInfavourableResults : observation.causes_of_infavourable_results,
        conclutions                 : observation.conclutions,
        recommendations             : observation.recommendations,
        observations                : observation.observations,
        state                       : observation.state,
        createdAt                   : observation.created,
        updatedAt                   : observation.modified,
    }
    return formatedObservation;
}
export const observationToJson = (observation: IObservation) => {
    const formatedObservation: IObservationDB = {
        id                              : observation.id,
        user_id                         : observation.userId,
        user_fullname                   : observation.userFullName,
        user_dni                        : observation.userDni,
        user_occupation                 : observation.userOccupation,
        user_signature                  : observation.userSignature,
        area_id                         : observation.areaId,
        area_name                       : observation.areaName,
        zone_name                       : observation.zoneName,
        company_id                      : observation.companyId,
        company_name                    : observation.companyName,
        company_address                 : observation.companyAddress,
        company_activity                : observation.companyActivity,
        company_ruc                     : observation.companyRuc,
        company_total_employees         : observation.companyTotalEmployees,
        observation_objective           : observation.observationObjective,
        task_name                       : observation.taskName,
        pet_code                        : observation.petCode,
        guard                           : observation.guard,
        datetime                        : observation.datetime,
        type                            : observation.typeId,
        causes_of_infavourable_results  : observation.causesOfInfavourableResults,
        conclutions                     : observation.conclutions,
        recommendations                 : observation.recommendations,
        observations                    : observation.observations,
        state                           : observation.state,
        created                         : observation.createdAt,
        modified                        : observation.updatedAt,
    }
    return formatedObservation;
}