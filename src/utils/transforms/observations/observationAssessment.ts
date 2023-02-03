import { IObservationAssessment, IObservationAssessmentDB } from "../../../interfaces/observations/observationAssessment";

export const formatObservationAssessment = ( observationAssessment: IObservationAssessmentDB ) => {
    const formatedObservationAssessment: IObservationAssessment = {
        id          : observationAssessment.id,
        gravity     : observationAssessment.gravity,
        state       : observationAssessment.state,
        createdAt   : observationAssessment.created,
        updatedAt   : observationAssessment.modified,
    }
    return formatedObservationAssessment;
}
export const observationAssessmentToJson = ( observationAssessment: IObservationAssessment ) => {
    const formatedObservationAssessment: IObservationAssessmentDB = {
        id          : observationAssessment.id,
        gravity     : observationAssessment.gravity,
        state       : observationAssessment.state,
        created     : observationAssessment.createdAt,
        modified    : observationAssessment.updatedAt,
    }
    return formatedObservationAssessment;
}