import { IInspectionDetail, IInspectionDetailDB } from "../../../interfaces/inspections/inspectionDetail";
import { formatInspection } from "./inspection";
import { formatInspectionAffected } from "./inspectionAffected";
import { formatInspectionAssessment } from "./inspectionAssessment";
import { formatInspectionDetailEvidence } from "./inspectionDetailEvidence";
import { formatInspectionDetailResponsible } from "./inspectionDetailReponsible";

export const formatInspectionDetail = ( inspectionDetail: IInspectionDetailDB, index?: number ) => {
    const formatedInspectionDetail: IInspectionDetail = {
        key                         : ( index || 0 ) + 1,
        id                          : inspectionDetail.id,
        inspectionId                : inspectionDetail.inspection_id,
        inspectionModel             : inspectionDetail.inspection_model && formatInspection( inspectionDetail.inspection_model ),
        affectedId                  : inspectionDetail.affected_id,
        affectedModel               : inspectionDetail.affected_model && formatInspectionAffected( inspectionDetail.affected_model ),
        affectedName                : inspectionDetail.affected_name,
        site                        : inspectionDetail.site,
        actionConsequenceDescription: inspectionDetail.action_consequence_description,
        impactDetails               : inspectionDetail.impact_details,
        type                        : inspectionDetail.type,
        assessmentId                : inspectionDetail.assesment_id,
        assessmentModel             : inspectionDetail.assessment_model && formatInspectionAssessment( inspectionDetail.assessment_model ),
        assessmentName               : inspectionDetail.assesment_name,
        affectedCode                : inspectionDetail.affected_code,
        correctiveTasks             : inspectionDetail.corrective_tasks,
        complianceDate              : inspectionDetail.compliance_date,
        percentage                  : inspectionDetail.percentage,
        observations                : inspectionDetail.observations,
        responsibleUsers            : inspectionDetail.responsible_users?.map(( r ) => formatInspectionDetailResponsible( r )),
        evidences                   : inspectionDetail.evidences?.map(( e ) => formatInspectionDetailEvidence( e )),
        state                       : inspectionDetail.state,
        createdAt                   : inspectionDetail.created,
        updatedAt                   : inspectionDetail.modified,
    }
    return formatedInspectionDetail;
}
export const inspectionDetailToJson = ( inspectionDetail: IInspectionDetail ) => {
    const formatedInspectionDetail: IInspectionDetailDB = {
        id                              : inspectionDetail.id,
        inspection_id                   : inspectionDetail.inspectionId,
        affected_id                     : inspectionDetail.affectedId,
        affected_name                   : inspectionDetail.affectedName,
        site                            : inspectionDetail.site,
        action_consequence_description  : inspectionDetail.actionConsequenceDescription,
        impact_details                  : inspectionDetail.impactDetails,
        type                            : inspectionDetail.type,
        assesment_id                    : inspectionDetail.assessmentId,
        assesment_name                  : inspectionDetail.assessmentName,
        affected_code                   : inspectionDetail.affectedCode,
        corrective_tasks                : inspectionDetail.correctiveTasks,
        compliance_date                 : inspectionDetail.complianceDate,
        percentage                      : inspectionDetail.percentage,
        observations                    : inspectionDetail.observations,
        state                           : inspectionDetail.state,
        created                         : inspectionDetail.createdAt,
        modified                        : inspectionDetail.updatedAt,
    }
    return formatedInspectionDetail;
}