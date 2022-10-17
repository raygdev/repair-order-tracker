import { createBrowserRouter} from "react-router-dom";
import { Login, loginLoader, loginActionData } from "./components/Login";
import { Register, redirectOnRegisterSuccess, handleAction } from "./components/Register";
import  App  from './App'
import User, { userLoaderFunction } from "./pages/User";
// import RepairOrders, { repairOrderLoader } from "./pages/RepairOrders";
import CreateRepairOrder, {createROActionLoader} from "./pages/CreateRepairOrder";
export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path:'register',
                element: <Register />,
                action: handleAction,
            },
            {
                path: 'login',
                element: <Login />,
                loader:loginLoader,
                action:loginActionData
            },
            {
                path: 'user/:userId',
                element:<User />,
                loader:userLoaderFunction,
                children:[
                    {
                     path:'create-repair-order',
                     action:createROActionLoader,
                     element: <CreateRepairOrder />
                    }
                ]
            }
        ]
    },
    
])