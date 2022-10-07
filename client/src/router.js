import { createBrowserRouter} from "react-router-dom";
import { Login } from "./components/Login";
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
                loading: redirectOnRegisterSuccess,
                action: handleAction
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    
])