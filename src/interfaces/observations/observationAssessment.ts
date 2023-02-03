export interface IObservationAssessment {
    id          ?: number;
    gravity     : string;
    state       : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface IObservationAssessmentDB {
    id          ?: number;
    gravity     : string;
    state       : boolean;
    created     ?: Date;
    modified    ?: Date;
}