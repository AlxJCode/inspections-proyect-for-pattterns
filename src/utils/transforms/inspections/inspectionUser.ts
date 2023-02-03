import { IInspectionUser, IInspectionUserDB } from "../../../interfaces/inspections/inspectionUser";
import { formatUser } from "../users/user";
import { formatInspection } from "./inspection";

export const formatInspectionUser = ( inspectionUser: IInspectionUserDB ) => {
    const formatedInspectionUser: IInspectionUser = {
        id              : inspectionUser.id,
        userId          : inspectionUser.user_id,
        userModel       : inspectionUser.user_model && formatUser( inspectionUser.user_model ),
        inspectionId    : inspectionUser.inspection_id,
        inspectionModel : inspectionUser.inspection_model && formatInspection( inspectionUser.inspection_model ),
        type            : inspectionUser.type,
        fullName        : inspectionUser.user_fullname,
        dni             : inspectionUser.dni,
        experience      : inspectionUser.experience,
        occupation      : inspectionUser.occupation,
        createdAt       : inspectionUser.created,
        updatedAt       : inspectionUser.modified,
    }
    return formatedInspectionUser;
}
export const inspectionUserToJson = ( inspectionUser: IInspectionUser ) => {
    const formatedInspectionUser: IInspectionUserDB = {
        id               : inspectionUser.id,
        user_id         : inspectionUser.userId,
        inspection_id   : inspectionUser.inspectionId,
        type            : inspectionUser.type,
        user_fullname   : inspectionUser.fullName,
        dni             : inspectionUser.dni,
        experience      : inspectionUser.experience,
        occupation      : inspectionUser.occupation,
        created         : inspectionUser.createdAt,
        modified        : inspectionUser.updatedAt,
    }
    return formatedInspectionUser;
}