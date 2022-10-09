import { createBrowserRouter} from "react-router-dom";
import { Login, loginLoader, loginLoadingData } from "./components/Login";
import { Register, redirectOnRegisterSuccess, handleAction } from "./components/Register";
import  App  from './App'
export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path:'register',
                element: <Register />,
                loader: redirectOnRegisterSuccess,
                action: handleAction,
            },
            {
                path: 'login',
                element: <Login />,
                loader:loginLoader,
                action:loginLoadingData
            }
        ]
    },
    
])