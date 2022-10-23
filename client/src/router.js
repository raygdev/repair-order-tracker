import { createBrowserRouter} from "react-router-dom";
import { Login, loginLoader, loginActionData } from "./components/Login";
import { Register, handleAction } from "./components/Register";
import  App  from './App'
import UserLayout from "./pages/UserLayout";
import User, { userLoaderFunction } from "./pages/User";
import CreateRepairOrder, {createROActionLoader} from "./pages/CreateRepairOrder";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { deleteRepairOrderAction } from "./components/DeleteButton";
export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index:true,
                element:<Home />
            },
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
                    },
                    {
                        path:'repairorder/delete/:repairId',
                        action: deleteRepairOrderAction
                    }
                ]
            }
        ]
    },
    
])