import { IObservationDetailResponsible, IObservationDetailResponsibleDB } from "../../../interfaces/observations/observationDetailResponsible";
import { formatUser } from "../users/user";
import { formatObservationDetail } from "./observationDetail";

export const formatObservationDetailResponsible = ( observationDetailResponsible: IObservationDetailResponsibleDB ) => {
    const formatedObservationDetailResponsible: IObservationDetailResponsible = {
        id                      : observationDetailResponsible.id,
        observationDetailId      : observationDetailResponsible.observation_detail_id,
        observationDetailModel   : observationDetailResponsible.observation_detail_model && formatObservationDetail( observationDetailResponsible.observation_detail_model ),
        userId                  : observationDetailResponsible.user_id,
        userModel               : observationDetailResponsible.user_model && formatUser( observationDetailResponsible.user_model ),
        userFullName            : observationDetailResponsible.user_fullname,
        userDni                 : observationDetailResponsible.user_dni,
        userPhone               : observationDetailResponsible.user_phone,
        userEmail               : observationDetailResponsible.user_email,
        createdAt               : observationDetailResponsible.created,
        updatedAt               : observationDetailResponsible.modified,
    }
    return formatedObservationDetailResponsible;
}
export const observationDetailResponsibleToJson = ( observationDetailResponsible: IObservationDetailResponsible ) => {
    const formatedObservationDetailResponsible: IObservationDetailResponsibleDB = {
        id                      : observationDetailResponsible.id,
        observation_detail_id    : observationDetailResponsible.observationDetailId,
        user_id                 : observationDetailResponsible.userId,
        user_fullname           : observationDetailResponsible.userFullName,
        user_dni                : observationDetailResponsible.userDni,
        user_phone              : observationDetailResponsible.userPhone,
        user_email              : observationDetailResponsible.userEmail,
        created                 : observationDetailResponsible.createdAt,
        modified                : observationDetailResponsible.updatedAt,
    }
    return formatedObservationDetailResponsible;
}