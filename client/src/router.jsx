import loadable from '@loadable/component'
import { createBrowserRouter} from "react-router-dom";
import { AuthProvider } from './provider/useAuthProvider';
import { requireAuth } from "@utils/requireAuth"
import {
    createROAction,
    deleteRepairOrderAction,
    editRepairOrderAction,
    registerAction,
    userLoader,
    loginAction,
    logoutAction,
    repairOrderLoader
} from "@utils/actionsAndLoaders";

const UserLayout = loadable(() => import("@pages/UserLayout"))
const  App = loadable( () => import('./App'))
const RepairOrder =  loadable(() => import("@pages/RepairOrder"))
const Home = loadable(() => import("@pages/Home"))
const Register = loadable(() => import('@components/Register'))
const User = loadable(() => import('@pages/User'))
const NotFound = loadable(() => import('@pages/NotFound'))
const EditRepairOrder = loadable(() => import('@pages/EditRepairOrder'))
const CreateRepairOrder = loadable(() => import('@pages/CreateRepairOrder'))
const Login = loadable(() => import('@components/Login'))
const About = loadable(() => import('@pages/About'))

export const router = createBrowserRouter([
    {
        path:'/',
        element: <AuthProvider><App /></AuthProvider>,
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
                path: 'about',
                element: <About />
            },
            {
                path: 'login',
                element: <Login />,
                loader: ({request}) => new URL(request.url).searchParams.get("message"),
                action:loginAction
            },
            {
                path: 'dashboard',
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
                     loader: async ({ request }) => await requireAuth(request),
                     action:createROAction,
                     element: <CreateRepairOrder />
                    },
                    {
                        path:'editrepairorder/:repairId',
                        element: <EditRepairOrder />,
                        loader: async ({ request }) => await requireAuth(request),
                        action: editRepairOrderAction
                    },
                    {
                        path:'repairorder/:repairId',
                        element: <RepairOrder />,
                        loader: repairOrderLoader
                    },
                    {
                        path:'repairorder/delete/:repairId',
                        action: deleteRepairOrderAction
                    },
                ]
            },
            {
                path: "*",
                element: <h1 className='text-xl text-center my-32'>Not Found</h1>
            }
        ]
    },
    
])