export interface IInspectionAssessment {
    id          ?: number;
    gravity     : string;
    state       : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IInspectionAssessmentDB {
    id          ?: number;
    gravity     : string;
    state       : boolean;
    created     ?: Date;
    modified    ?: Date;
}