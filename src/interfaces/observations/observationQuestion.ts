
export interface IObservationQuestion {
    id                  ?: number;
    code                : string;
    order               : number;
    question            : string;
    createdAt           ?: Date;
    updatedAt           ?: Date;
}

export interface IObservationQuestionDB {
    id          ?: number;
    code        : string;
    order       : number;
    question    : string;
    created     ?: Date;
    modified    ?: Date;
}