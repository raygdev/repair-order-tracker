import { createContext, useState, useEffect } from "react";
import { authService } from "../services/auth/index";

export interface UserAuthContext {
    isAuth: boolean,
    user: User | undefined
}

interface User {
    firstName: string,
    lastName: string,
    email: string,
    id: string
}

const AuthContext = createContext<UserAuthContext | null>(null)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [ auth, setAuth ] = useState<UserAuthContext>({
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
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext}