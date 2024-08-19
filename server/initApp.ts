import exp, { Application } from 'express'
import { NotFoundError } from './errors/not-found-error'
type Express = typeof exp

import helmet from 'helmet'
import cors from 'cors'
import path from 'path'


import { registerRoute } from './routes/register'
import { loginRoute } from './routes/login'
import { userRoutes } from './routes/user'
import { repairOrderRoutes } from './routes/repair-order-routes'
import { vehicleRoute } from "./routes/vehicle"
import { verify } from "./routes/verify"
import { errorHandler }  from './controllers/middleware/error-handler'
const origin = process.env.NODE_ENV === 'production' ? 'https://repair-order-tracker.vercel.app' : 'http://localhost:5173'

export function  initApp(app: Application, express: Express){
    app.use(express.static(path.join(__dirname, 'build',)))
    app.use(cors({ origin }))
    app.use(helmet())
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(verify)
    app.use(registerRoute)
    app.use(loginRoute)
    app.use(userRoutes)
    app.use(repairOrderRoutes)
    app.use(vehicleRoute)
    app.use('*', (req, res) => {
        throw new NotFoundError()
    })
    app.use(errorHandler)
}
