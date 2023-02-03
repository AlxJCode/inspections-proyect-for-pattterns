import { IObservationUser, IObservationUserDB } from "../../../interfaces/observations/observationUser";
import { formatUser } from "../users/user";
import { formatObservation } from "./observation";

export const formatObservationUser = ( observationUser: IObservationUserDB ) => {
    const formatedObservationUser: IObservationUser = {
        id              : observationUser.id,
        userId          : observationUser.user_id,
        userModel       : observationUser.user_model && formatUser( observationUser.user_model ),
        observationId    : observationUser.observation_id,
        fullName        : observationUser.user_fullname,
        observationModel : observationUser.observation_model && formatObservation( observationUser.observation_model ),
        type            : observationUser.type,
        dni             : observationUser.dni,
        experience      : observationUser.experience,
        occupation      : observationUser.occupation,
        createdAt       : observationUser.created,
        updatedAt       : observationUser.modified,
    }
    return formatedObservationUser;
}
export const observationUserToJson = ( observationUser: IObservationUser ) => {
    const formatedObservationUser: IObservationUserDB = {
        id               : observationUser.id,
        user_id         : observationUser.userId,
        observation_id   : observationUser.observationId,
        user_fullname : observationUser.fullName,
        type            : observationUser.type,
        dni             : observationUser.dni,
        experience      : observationUser.experience,
        occupation      : observationUser.occupation,
        created         : observationUser.createdAt,
        modified        : observationUser.updatedAt,
    }
    return formatedObservationUser;
}