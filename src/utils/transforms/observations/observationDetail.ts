import { IObservationDetail, IObservationDetailDB } from "../../../interfaces/observations/observationDetail";
import { formatObservation } from "./observation";
import { formatObservationAffected } from "./observationAffected";
import { formatObservationAssessment } from "./observationAssessment";
import { formatObservationDetailEvidence } from "./observationDetailEvidence";
import { formatObservationDetailResponsible } from "./observationDetailReponsible";

export const formatObservationDetail = ( observationDetail: IObservationDetailDB, index?: number ) => {
    const formatedObservationDetail: IObservationDetail = {
        key                         : ( index || 0 ) + 1,
        id                          : observationDetail.id,
        observationId                : observationDetail.observation_id,
        observationModel             : observationDetail.observation_model && formatObservation( observationDetail.observation_model ),
        affectedId                  : observationDetail.affected_id,
        affectedModel               : observationDetail.affected_model && formatObservationAffected( observationDetail.affected_model ),
        affectedName                : observationDetail.affected_name,
        site                        : observationDetail.site,
        actionConsequenceDescription: observationDetail.action_consequence_description,
        impactDetails               : observationDetail.impact_details,
        type                        : observationDetail.type,
        assessmentId                : observationDetail.assesment_id,
        assessmentModel             : observationDetail.assessment_model && formatObservationAssessment( observationDetail.assessment_model ),
        assessmentName               : observationDetail.assesment_name,
        affectedCode                : observationDetail.affected_code,
        correctiveTasks             : observationDetail.corrective_tasks,
        complianceDate              : observationDetail.compliance_date,
        percentage                  : observationDetail.percentage,
        observations                : observationDetail.observations,
        responsibleUsers            : observationDetail.responsible_users?.map(( r ) => formatObservationDetailResponsible( r )),
        evidences                   : observationDetail.evidences?.map(( e ) => formatObservationDetailEvidence( e )),
        state                       : observationDetail.state,
        createdAt                   : observationDetail.created,
        updatedAt                   : observationDetail.modified,
    }
    return formatedObservationDetail;
}
export const observationDetailToJson = ( observationDetail: IObservationDetail ) => {
    const formatedObservationDetail: IObservationDetailDB = {
        id                              : observationDetail.id,
        observation_id                   : observationDetail.observationId,
        affected_id                     : observationDetail.affectedId,
        affected_name                   : observationDetail.affectedName,
        site                            : observationDetail.site,
        action_consequence_description  : observationDetail.actionConsequenceDescription,
        impact_details                  : observationDetail.impactDetails,
        type                            : observationDetail.type,
        assesment_id                    : observationDetail.assessmentId,
        assesment_name                  : observationDetail.assessmentName,
        affected_code                   : observationDetail.affectedCode,
        corrective_tasks                : observationDetail.correctiveTasks,
        compliance_date                 : observationDetail.complianceDate,
        percentage                      : observationDetail.percentage,
        observations                    : observationDetail.observations,
        state                           : observationDetail.state,
        created                         : observationDetail.createdAt,
        modified                        : observationDetail.updatedAt,
    }
    return formatedObservationDetail;
}