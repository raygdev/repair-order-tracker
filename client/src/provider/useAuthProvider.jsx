import { createContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({
        isAuth: authService.isLoggedIn(),
        user: authService.user
    })

    useEffect(() => {
        const authListener = () => {
            setAuth({
                isAuth: authService.isLoggedIn(),
                user: authService.user
            })
        }

        authService.addAuthListener(authListener)

        return () => authService.unsubscribe(authListener)
    }, [children])

    return (
        <AuthContext.Provider value={{
            auth,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext}