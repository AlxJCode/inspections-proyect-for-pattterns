import { IInspectionAffected, IInspectionAffectedDB } from "../../../interfaces/inspections/inspectionAffected";

export const formatInspectionAffected = ( inspectionAffected: IInspectionAffectedDB ) => {
    const formatedInspectionAffected: IInspectionAffected = {
        id          : inspectionAffected.id,
        name        : inspectionAffected.name,
        category    : inspectionAffected.category,
        code        : inspectionAffected.code,
        state       : inspectionAffected.state,
        createdAt   : inspectionAffected.created,
        updatedAt   : inspectionAffected.modified,
    }
    return formatedInspectionAffected;
}
export const inspectionAffectedToJson = ( inspectionAffected: IInspectionAffected ) => {
    const formatedInspectionAffected: IInspectionAffectedDB = {
        id          : inspectionAffected.id,
        name        : inspectionAffected.name,
        category    : inspectionAffected.category,
        code        : inspectionAffected.code,
        state       : inspectionAffected.state,
        created     : inspectionAffected.createdAt,
        modified    : inspectionAffected.updatedAt,
    }
    return formatedInspectionAffected;
}