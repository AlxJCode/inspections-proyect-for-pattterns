import { IObservationDetailEvidence } from "../observations/observationDetailEvidence";
import { IObservationDetailResponsible } from "../observations/observationDetailResponsible";
import { IObservation, IObservationDB } from "./observation";
import { IObservationAffected } from "./observationAffected";
import { IObservationAssessment } from "./observationAssessment";
import { IObservationDetailEvidenceDB } from "./observationDetailEvidence";
import { IObservationDetailResponsibleDB } from "./observationDetailResponsible";

export interface IObservationDetail {
    key                         ?: number;
    id                          ?: string;
    observationId                : number;
    observationModel             ?: IObservation;
    affectedId                  ?: number;
    affectedModel               ?: IObservationAffected;
    affectedName                : string;
    site                        : string;
    actionConsequenceDescription: string;
    impactDetails               : string;
    type                        : string;
    assessmentId                : number;
    assessmentModel             ?: IObservationAssessment;
    assessmentName               : string;
    affectedCode                : string;
    correctiveTasks             : string;
    complianceDate              : Date;
    percentage                  : number;
    observations                ?: string;
    responsibleUsers            ?: IObservationDetailResponsible[];
    evidences                   ?: IObservationDetailEvidence[];
    state                       : string;
    createdAt                   ?: Date;
    updatedAt                   ?: Date;
}

export interface IObservationDetailDB {
    id                              ?: string;
    observation_id                   : number;
    observation_model                ?: IObservationDB;
    affected_id                     ?: number;
    affected_model                  ?: IObservationAffected;
    affected_name                   : string;
    site                            : string;
    action_consequence_description  : string;
    impact_details                  : string;
    type                            : string;
    assesment_id                    : number;
    assessment_model                ?: IObservationAssessment;
    assesment_name                  : string;
    affected_code                   : string;
    corrective_tasks                : string;
    compliance_date                 : Date;
    percentage                      : number;
    observations                    ?: string;
    responsible_users               ?: IObservationDetailResponsibleDB[];
    evidences                       ?: IObservationDetailEvidenceDB[];
    state                           : string;
    created                         ?: Date;
    modified                        ?: Date;
}