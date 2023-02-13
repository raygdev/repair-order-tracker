import { createContext, useState } from "react";
import { redirect } from "react-router";
import { getToken } from "../utils/token";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({
        isAuth: false,
        token: getToken()
    })

    return (
        <AuthContext.Provider value={{
            ...auth,
            setAuth
        }}>
            { auth.token ? children : redirect('/login')}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext}