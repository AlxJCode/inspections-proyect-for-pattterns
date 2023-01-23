import { IInspectionDetailResponsible, IInspectionDetailResponsibleDB } from "../../../interfaces/inspections/inspectionDetailResponsible";
import { formatUser } from "../users/user";
import { formatInspectionDetail } from "./inspectionDetail";

export const formatInspectionDetailResponsible = ( inspectionDetailResponsible: IInspectionDetailResponsibleDB ) => {
    const formatedInspectionDetailResponsible: IInspectionDetailResponsible = {
        id                      : inspectionDetailResponsible.id,
        inspectionDetailId      : inspectionDetailResponsible.inspection_detail_id,
        inspectionDetailModel   : inspectionDetailResponsible.inspection_detail_model && formatInspectionDetail( inspectionDetailResponsible.inspection_detail_model ),
        userId                  : inspectionDetailResponsible.user_id,
        userModel               : inspectionDetailResponsible.user_model && formatUser( inspectionDetailResponsible.user_model ),
        userFullName            : inspectionDetailResponsible.user_fullname,
        userDni                 : inspectionDetailResponsible.user_dni,
        userPhone               : inspectionDetailResponsible.user_phone,
        userEmail               : inspectionDetailResponsible.user_email,
        createdAt               : inspectionDetailResponsible.created,
        updatedAt               : inspectionDetailResponsible.modified,
    }
    return formatedInspectionDetailResponsible;
}
export const inspectionDetailResponsibleToJson = ( inspectionDetailResponsible: IInspectionDetailResponsible ) => {
    const formatedInspectionDetailResponsible: IInspectionDetailResponsibleDB = {
        id                      : inspectionDetailResponsible.id,
        inspection_detail_id    : inspectionDetailResponsible.inspectionDetailId,
        user_id                 : inspectionDetailResponsible.userId,
        user_fullname           : inspectionDetailResponsible.userFullName,
        user_dni                : inspectionDetailResponsible.userDni,
        user_phone              : inspectionDetailResponsible.userPhone,
        user_email              : inspectionDetailResponsible.userEmail,
        created                 : inspectionDetailResponsible.createdAt,
        modified                : inspectionDetailResponsible.updatedAt,
    }
    return formatedInspectionDetailResponsible;
}