import { ICompany, ICompanyDB } from "../../../interfaces/users/company";

// Users
export const formatCompany = (company: ICompanyDB) => {
    const formatedCompany: ICompany = {
        key             : company.id,
        id              : company.id,
        name            : company.name,
        ruc             : company.ruc,
        economicActivity: company.economic_activity,
        state           : company.state,
        createdAt       : company.created,
        updatedAt       : company.modified,
    }
    return formatedCompany;
}
export const companyToJson = (company: ICompany) => {
    const formatedCompany: ICompanyDB = {
        id                  : company.id,
        name                : company.name,
        ruc                 : company.ruc,
        economic_activity   : company.economicActivity,
        state               : company.state,
        created             : company.createdAt,
        modified            : company.updatedAt,
    }
    return formatedCompany;
}