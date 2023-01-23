import { IArea, IAreaDB } from "../../../interfaces/users/area";
import { formatCompany } from "./company";

// Users
export const formatArea = (area: IAreaDB) => {
    const formatedArea: IArea = {
        key             : area.id,
        id              : area.id,
        name            : area.name,
        companyId       : area.company_id,
        companyModel    : area.company_model && formatCompany( area.company_model ),
        state           : area.state,
        createdAt       : area.created,
        updatedAt       : area.modified,
    }
    return formatedArea;
}
export const areaToJson = (area: IArea) => {
    const formatedArea: IAreaDB = {
        id                  : area.id,
        name                : area.name,
        company_id          : area.companyId,
        state               : area.state,
        created             : area.createdAt,
        modified            : area.updatedAt,
    }
    return formatedArea;
}