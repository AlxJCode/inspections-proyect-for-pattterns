import { IObservationDetailEvidence, IObservationDetailEvidenceDB } from "../../../interfaces/observations/observationDetailEvidence";
import { formatUser } from "../users/user";
import { formatObservationDetail } from "./observationDetail";

export const formatObservationDetailEvidence = ( observationDetailEvidence: IObservationDetailEvidenceDB ) => {
    const formatedObservationDetailEvidence: IObservationDetailEvidence = {
        id                      : observationDetailEvidence.id,
        observationDetailId      : observationDetailEvidence.observation_detail_id,
        observationDetailModel   : observationDetailEvidence.observation_detail_model && formatObservationDetail( observationDetailEvidence.observation_detail_model ),
        userId                  : observationDetailEvidence.user_id,
        userModel               : observationDetailEvidence.user_model && formatUser( observationDetailEvidence.user_model ),
        evidence                : observationDetailEvidence.evidence,
        percentage              : observationDetailEvidence.percentage,
        type                    : observationDetailEvidence.type,
        state                   : observationDetailEvidence.state,
        createdAt               : observationDetailEvidence.created,
        updatedAt               : observationDetailEvidence.modified,
    }
    return formatedObservationDetailEvidence;
}
export const observationDetailEvidenceToJson = ( observationDetailEvidence: IObservationDetailEvidence ) => {
    const formatedObservationDetailEvidence: IObservationDetailEvidenceDB = {
        id                      : observationDetailEvidence.id,
        observation_detail_id    : observationDetailEvidence.observationDetailId,
        user_id                 : observationDetailEvidence.userId,
        evidence                : observationDetailEvidence.evidence,
        percentage              : observationDetailEvidence.percentage,
        type                    : observationDetailEvidence.type,
        state                   : observationDetailEvidence.state,
        created                 : observationDetailEvidence.createdAt,
        modified                : observationDetailEvidence.updatedAt,
    }
    return formatedObservationDetailEvidence;
}