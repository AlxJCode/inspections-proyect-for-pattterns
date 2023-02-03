import { IObservationQuestion, IObservationQuestionDB } from "../../../interfaces/observations/observationQuestion";

export const formatObservationQuestion = ( observationQuestion: IObservationQuestionDB ) => {
    const formatedObservationQuestion: IObservationQuestion = {
        id              : observationQuestion.id,
        code            : observationQuestion.code,
        order           :  observationQuestion.order,
        question        : observationQuestion.question,
        createdAt       : observationQuestion.created,
        updatedAt       : observationQuestion.modified,
    }
    return formatedObservationQuestion;
}
export const observationQuestionToJson = ( observationQuestion: IObservationQuestion ) => {
    const formatedObservationQuestion: IObservationQuestionDB = {
        id                  : observationQuestion.id,
        code                : observationQuestion.code,
        order               : observationQuestion.order,
        question            : observationQuestion.question,
        created             : observationQuestion.createdAt,
        modified            : observationQuestion.updatedAt,
    }
    return formatedObservationQuestion;
}