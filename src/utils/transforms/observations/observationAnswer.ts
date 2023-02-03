import { IObservationAnswer, IObservationAnswerDB } from "../../../interfaces/observations/observationAnswer";
import { formatObservation } from "./observation";
import { formatObservationQuestion } from "./observationQuestion";

export const formatObservationAnswer = ( observationAnswer: IObservationAnswerDB ) => {
    const formatedObservationAnswer: IObservationAnswer = {
        id              : observationAnswer.id,
        observationId   : observationAnswer.observation_id,
        observationModel: observationAnswer.observation_model && formatObservation( observationAnswer.observation_model ),
        questionId      : observationAnswer.question_id,
        questionModel   : observationAnswer.question_model && formatObservationQuestion( observationAnswer.question_model ),
        response        : observationAnswer.response,
        createdAt       : observationAnswer.created,
        updatedAt       : observationAnswer.modified,
    }
    return formatedObservationAnswer;
}
export const observationAnswerToJson = ( observationAnswer: IObservationAnswer ) => {
    const formatedObservationAnswer: IObservationAnswerDB = {
        id                  : observationAnswer.id,
        observation_id      : observationAnswer.observationId,
        question_id         : observationAnswer.questionId,
        response            : observationAnswer.response,
        created             : observationAnswer.createdAt,
        modified            : observationAnswer.updatedAt,
    }
    return formatedObservationAnswer;
}