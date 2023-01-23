import axios from "axios";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useReducer } from "react";
import { deleteToken, getToken, setToken } from "../../helpers/auth-helpers";
import { IUser } from "../../interfaces/users/user";
import { isValidToken } from "../../utils/jwt";
import { AuthContext, authReducer } from "./index";

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

type AuthProviderProps = {
    children?: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {

        if (!getToken()) {
            dispatch({ type: "[Auth] - Logout"});
            return
        }

        try {
            const response = await axios.get('/auth/verify/');
            const { systemuser_id, type } = await isValidToken(getToken() || "");
            dispatch({ type: "[Auth] - Verify", payload: {
                id: systemuser_id,
                name: "user",
                type,
            }});
        } catch (error) {
            console.log(error)
            logout();
        }
    }


    const login = async (username: string, password: string): Promise<boolean> => {

        try {
            const { data } = await axios.post('/auth/', {
                username,
                password
            });
            const { access, user } = data.data;
            dispatch({ type: "[Auth] - Login", payload: user });
            setToken(access);
            return true;
        } catch (error) {
            console.log("ERROR", error);
            return false;
        }
    }

    const logout = () => {
        deleteToken();
        dispatch({ type: "[Auth] - Logout"});
        router.replace("/login");
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            login,
            logout

        }}>
            {children}
        </AuthContext.Provider>
    )

}