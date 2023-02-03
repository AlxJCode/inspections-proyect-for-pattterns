import { IObservation, IObservationDB } from "./observation";
import { IObservationQuestion, IObservationQuestionDB } from "./observationQuestion";

export interface IObservationAnswer {
    id              ?: number;
    observationId   : number;
    observationModel?: IObservation;
    questionId      : number;
    questionModel   ?: IObservationQuestion;
    response        : string;
    createdAt       ?: Date;
    updatedAt       ?: Date;
}

export interface IObservationAnswerDB {
    id                  ?: number;
    observation_id      : number;
    observation_model   ?: IObservationDB;
    question_id         : number;
    question_model      ?: IObservationQuestionDB;
    response            :string;
    created             ?: Date;
    modified            ?: Date;
}