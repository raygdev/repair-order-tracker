import loadable from '@loadable/component'
import { createBrowserRouter} from "react-router-dom";
import {
    createROAction,
    deleteRepairOrderAction,
    editRepairOrderAction,
    registerAction,
    userLoader,
    loginAction,
    logoutAction
} from "./utils/actionsAndLoaders";

const UserLayout = loadable(() => import("./pages/UserLayout"))
const  App = loadable( () => import('./App'))
const RepairOrder =  loadable(() => import("./pages/RepairOrder"))
const Home = loadable(() => import("./pages/Home"))
const Register = loadable(() => import('./components/Register'))
const User = loadable(() => import('./pages/User'))
const NotFound = loadable(() => import('./pages/NotFound'))
const EditRepairOrder = loadable(() => import('./pages/EditRepairOrder'))
const CreateRepairOrder = loadable(() => import('./pages/CreateRepairOrder'))
const Login = loadable(() => import('./components/Login'))

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
                action: registerAction,
            },
            {
                path: 'logout',
                action: logoutAction
            },
            {
                path: 'login',
                element: <Login />,
                action:loginAction
            },
            {
                path: 'user/:userId',
                element:<UserLayout />,
                loader: userLoader,
                id:'root',
                children:[
                    {
                        index: true,
                        element: <User />
                    },
                    {
                     path:'create-repair-order',
                     action:createROAction,
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
                    },
                ]
            }
        ]
    },
    
])