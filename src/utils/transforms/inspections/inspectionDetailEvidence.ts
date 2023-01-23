import { IInspectionDetailEvidence, IInspectionDetailEvidenceDB } from "../../../interfaces/inspections/inspectionDetailEvidence";
import { formatUser } from "../users/user";
import { formatInspectionDetail } from "./inspectionDetail";

export const formatInspectionDetailEvidence = ( inspectionDetailEvidence: IInspectionDetailEvidenceDB ) => {
    const formatedInspectionDetailEvidence: IInspectionDetailEvidence = {
        id                      : inspectionDetailEvidence.id,
        inspectionDetailId      : inspectionDetailEvidence.inspection_detail_id,
        inspectionDetailModel   : inspectionDetailEvidence.inspection_detail_model && formatInspectionDetail( inspectionDetailEvidence.inspection_detail_model ),
        userId                  : inspectionDetailEvidence.user_id,
        userModel               : inspectionDetailEvidence.user_model && formatUser( inspectionDetailEvidence.user_model ),
        evidence                : inspectionDetailEvidence.evidence,
        percentage              : inspectionDetailEvidence.percentage,
        type                    : inspectionDetailEvidence.type,
        state                   : inspectionDetailEvidence.state,
        createdAt               : inspectionDetailEvidence.created,
        updatedAt               : inspectionDetailEvidence.modified,
    }
    return formatedInspectionDetailEvidence;
}
export const inspectionDetailEvidenceToJson = ( inspectionDetailEvidence: IInspectionDetailEvidence ) => {
    const formatedInspectionDetailEvidence: IInspectionDetailEvidenceDB = {
        id                      : inspectionDetailEvidence.id,
        inspection_detail_id    : inspectionDetailEvidence.inspectionDetailId,
        user_id                 : inspectionDetailEvidence.userId,
        evidence                : inspectionDetailEvidence.evidence,
        percentage              : inspectionDetailEvidence.percentage,
        type                    : inspectionDetailEvidence.type,
        state                   : inspectionDetailEvidence.state,
        created                 : inspectionDetailEvidence.createdAt,
        modified                : inspectionDetailEvidence.updatedAt,
    }
    return formatedInspectionDetailEvidence;
}