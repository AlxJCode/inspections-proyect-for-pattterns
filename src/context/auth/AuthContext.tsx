import { createContext } from "react";
import { IUser } from "../../interfaces/users/user";

interface ContextProps {
    isLoggedIn  : boolean;
    user        ?: IUser;
    login       : (username:string, password:string) => Promise<boolean>;
    logout      : () => void;
}

export const AuthContext = createContext({} as ContextProps)