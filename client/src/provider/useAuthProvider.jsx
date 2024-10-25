import { createContext, useState } from "react";
import { redirect } from "react-router";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const user = useAuth()
    const [ auth, setAuth ] = useState({
        isAuth: false,
        token: user
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