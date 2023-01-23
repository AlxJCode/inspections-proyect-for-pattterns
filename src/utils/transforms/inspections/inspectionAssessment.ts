import { IInspectionAssessment, IInspectionAssessmentDB } from "../../../interfaces/inspections/inspectionAssessment";

export const formatInspectionAssessment = ( inspectionAssessment: IInspectionAssessmentDB ) => {
    const formatedInspectionAssessment: IInspectionAssessment = {
        id          : inspectionAssessment.id,
        gravity     : inspectionAssessment.gravity,
        state       : inspectionAssessment.state,
        createdAt   : inspectionAssessment.created,
        updatedAt   : inspectionAssessment.modified,
    }
    return formatedInspectionAssessment;
}
export const inspectionAssessmentToJson = ( inspectionAssessment: IInspectionAssessment ) => {
    const formatedInspectionAssessment: IInspectionAssessmentDB = {
        id          : inspectionAssessment.id,
        gravity     : inspectionAssessment.gravity,
        state       : inspectionAssessment.state,
        created     : inspectionAssessment.createdAt,
        modified    : inspectionAssessment.updatedAt,
    }
    return formatedInspectionAssessment;
}