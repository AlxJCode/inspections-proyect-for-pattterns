import { IUserDB, IUserDetail } from "../../../interfaces/users/user";
import { formatArea } from "./area";

// Users
export const formatUser = (user: IUserDB) => {
    const formatedUser: IUserDetail = {
        key             : user.id,
        id              : user.id,
        name            : user.name,
        firstLastName   : user.first_last_name,
        secondLastName  : user.second_last_name,
        type            : user.type,
        email           : user.email,
        phone           : user.phone,
        dni             : user.dni,
        areaId          : user.area_id,
        areaModel       : user.area_model && formatArea(user.area_model),
        state           : user.state,
        createdAt       : user.created,
        updatedAt       : user.modified,
    }
    return formatedUser;
}
export const userToJson = (user: IUserDetail) => {
    const formatedUser: IUserDB = {
        id              : user.id,
        name            : user.name,
        first_last_name : user.firstLastName,
        second_last_name: user.secondLastName,
        type            : user.type,
        email           : user.email,
        phone           : user.phone,
        dni             : user.dni,
        area_id         : user.areaId,
        state           : user.state,
        created         : user.createdAt,
        modified        : user.updatedAt,
    }
    return formatedUser;
}