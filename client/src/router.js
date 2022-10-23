import { createBrowserRouter} from "react-router-dom";
import { Login, loginLoader, loginActionData } from "./components/Login";
import { Register, handleAction } from "./components/Register";
import  App  from './App'
import UserLayout from "./pages/UserLayout";
import User, { userLoaderFunction } from "./pages/User";
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
                element:<UserLayout />,
                loader: userLoaderFunction,
                id:'root',
                children:[
                    {
                        index: true,
                        element: <User />
                    },
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