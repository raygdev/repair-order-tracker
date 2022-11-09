import loadable from '@loadable/component'
import { createBrowserRouter} from "react-router-dom";
import { Login, loginLoader, loginActionData } from "./components/Login";
import  {handleAction } from "./components/Register";
import { userLoaderFunction } from "./pages/User";
import {createROActionLoader} from "./pages/CreateRepairOrder";
import { deleteRepairOrderAction } from "./components/DeleteButton";
import { editRepairOrderAction } from "./pages/EditRepairOrder";
const UserLayout = loadable(() => import("./pages/UserLayout"))
const  App = loadable( () => import('./App'))
const RepairOrder =  loadable(() => import("./pages/RepairOrder"))
const Home = loadable(() => import("./pages/Home"))
const Register = loadable(() => import('./components/Register'))
const User = loadable(() => import('./pages/User'))
const NotFound = loadable(() => import('./pages/NotFound'))
const EditRepairOrder = loadable(() => import('./pages/EditRepairOrder'))
const CreateRepairOrder = loadable(() => import('./pages/CreateRepairOrder'))
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
                        path:'editrepairorder/:repairId',
                        element: <EditRepairOrder />
                    },
                    {
                        path:'repairorder/:repairId',
                        element: <RepairOrder />
                    },
                    {
                        path:'repairorder/delete/:repairId',
                        action: deleteRepairOrderAction
                    },
                    {
                        path:'repairorders/edit/:repairId',
                        action: editRepairOrderAction
                    }
                ]
            }
        ]
    },
    
])