import loadable from '@loadable/component'
import { AuthProvider } from './provider/useAuthProvider.jsx';
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
import { partDelete } from '@features/repair-orders/src/lib/use-cases/parts/part-delete.use-case.js';
import { partCreate } from '@features/repair-orders/src/lib/use-cases/parts/part-create.use-case.js';
import { partUpdate } from '@features/repair-orders/src/lib/use-cases/parts/part-update.use-case.js';
import { jobCreate } from '@features/repair-orders/src/lib/use-cases/jobs/job-create.use-case.js';
import { jobUpdate } from '@features/repair-orders/src/lib/use-cases/jobs/job-update.use-case.js';
import { jobDelete } from '@features/repair-orders/src/lib/use-cases/jobs/job-delete.use-case.js';
import type { RouteObject } from 'react-router';
import type { CreatePart, Part, Job, CreateJob } from '@features/repair-orders/src/lib/domain/index.js';
import { RepairOrderPage } from '@features/repair-orders/src/components/repair-page/repair-page';  

const UserLayout = loadable(() => import("@pages/UserLayout"))
const  App = loadable( () => import('./App.js'))
// const RepairOrderPage =  loadable(() => import('@features/repair-orders/src/components/repair-page/repair-page.tsx'))
const Home = loadable(() => import("@pages/Home"))
const Register = loadable(() => import('@components/Register'))
const User = loadable(() => import('@pages/User'))
const NotFound = loadable(() => import('@pages/NotFound'))
const EditRepairOrder = loadable(() => import('@pages/EditRepairOrder'))
const CreateRepairOrder = loadable(() => import('@pages/CreateRepairOrder'))
const Login = loadable(() => import('@components/Login'))
const About = loadable(() => import('@pages/About'))

export const router: RouteObject[] = [
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
                        element: <RepairOrderPage />,
                        loader: repairOrderLoader,
                        children: [
                            {
                                path: 'part/delete/:id',
                                action: async ({ request }) => {
                                    const { id } = await request.json();
                                    await partDelete.execute(id)
                                    return { success: true }
                                }
                            },
                            {
                                path: 'part/create',
                                action: async ({ request }) => {
                                    const data = await request.json();
                                    const part: CreatePart = {
                                        jobId: data.hiddenId,
                                        name: data.name,
                                        price: data.price
                                    }
                                     await partCreate.execute(part)
                                    return { success: true }
                                }
                            },
                            {
                                path: 'part/update/:id',
                                action: async ({ request, params }) => {
                                    const { id } = params;
                                    const data = await request.json();
                                    const part: Part = {
                                      id,
                                      ...data
                                    }
                                    await partUpdate.execute(part)
                                    return { success: true }
                                }
                            },
                            {
                                path: 'job/create',
                                action: async ({ request, params }) => {
                                    const { repairId } = params
                                    const data = await request.json();
                                    console.log(data)
                                    console.log("ID",repairId)
                                    const job: CreateJob = {
                                        repairId,
                                        ...data
                                    }
                                    await jobCreate.execute(job)
                                    return { success: true }
                                }
                            },
                            {
                                path: 'job/update/:id',
                                action: async ({ request, params }) => {
                                    const { id } = params;
                                    const data = await request.json();
                                    console.log(data)
                                    const job: Job = {
                                        id,
                                        ...data
                                    }
                                    await jobUpdate.execute(job)
                                    return { success: true }
                                }
                            },
                            {
                                path: 'job/delete/:id',
                                action: async ({ request }) => {
                                    const { id } = await request.json();
                                    await jobDelete.execute(id)
                                    return { success: true }
                                }
                            },

                        ]
                    },
                    {
                        path:'repairorder/delete/:repairId',
                        action: deleteRepairOrderAction
                    },
                ]
            }
        ]
    },
    
]