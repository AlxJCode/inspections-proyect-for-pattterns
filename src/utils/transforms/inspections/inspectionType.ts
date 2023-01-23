import { IInspectionType, IInspectionTypeDB } from "../../../interfaces/inspections/inspectionType";

export const formatInspectionType = ( inspectionType: IInspectionTypeDB ) => {
    const formatedInspectionType: IInspectionType = {
        id              : inspectionType.id,
        name            : inspectionType.name,
        subtype         : inspectionType.subtype,
        createdAt       : inspectionType.created,
        updatedAt       : inspectionType.modified,
    }
    return formatedInspectionType;
}
export const inspectionTypeToJson = ( inspectionType: IInspectionType ) => {
    const formatedInspectionType: IInspectionTypeDB = {
        id                  : inspectionType.id,
        name                : inspectionType.name,
        subtype             : inspectionType.subtype,
        created             : inspectionType.createdAt,
        modified            : inspectionType.updatedAt,
    }
    return formatedInspectionType;
}