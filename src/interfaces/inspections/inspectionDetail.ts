import { IInspection, IInspectionDB } from "./inspection";
import { IInspectionAffected } from "./inspectionAffected";
import { IInspectionAssessment } from "./inspectionAssessment";
import { IInspectionDetailResponsible, IInspectionDetailResponsibleDB } from "./inspectionDetailResponsible";
import { IInspectionDetailEvidence, IInspectionDetailEvidenceDB } from "./inspectionDetailEvidence"

export interface IInspectionDetail {
    key                         ?: number;
    id                          ?: string;
    inspectionId                : number;
    inspectionModel             ?: IInspection;
    affectedId                  ?: number;
    affectedModel               ?: IInspectionAffected;
    affectedName                : string;
    site                        : string;
    actionConsequenceDescription: string;
    impactDetails               : string;
    type                        : string;
    assessmentId                : number;
    assessmentModel             ?: IInspectionAssessment;
    assessmentName               : string;
    affectedCode                : string;
    correctiveTasks             : string;
    complianceDate              : Date;
    percentage                  : number;
    observations                ?: string;
    responsibleUsers            ?: IInspectionDetailResponsible[];
    evidences                   ?: IInspectionDetailEvidence[];
    state                       : string;
    createdAt                   ?: Date;
    updatedAt                   ?: Date;
}

export interface IInspectionDetailDB {
    id                              ?: string;
    inspection_id                   : number;
    inspection_model                ?: IInspectionDB;
    affected_id                     ?: number;
    affected_model                  ?: IInspectionAffected;
    affected_name                   : string;
    site                            : string;
    action_consequence_description  : string;
    impact_details                  : string;
    type                            : string;
    assesment_id                    : number;
    assessment_model                ?: IInspectionAssessment;
    assesment_name                  : string;
    affected_code                   : string;
    corrective_tasks                : string;
    compliance_date                 : Date;
    percentage                      : number;
    observations                    ?: string;
    responsible_users               ?: IInspectionDetailResponsibleDB[];
    evidences                       ?: IInspectionDetailEvidenceDB[];
    state                           : string;
    created                         ?: Date;
    modified                        ?: Date;
}