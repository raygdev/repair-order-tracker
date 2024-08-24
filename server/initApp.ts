import express, { Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import 'express-async-errors'

import { NotFoundError } from './errors/not-found-error'

import { registerRoute } from './routes/auth/register'
import { loginRoute } from './routes/auth/login'
import { userRoutes } from './routes/user/user'
import { repairOrderRoutes } from './routes/repair-orders/repair-order-routes'
import { vehicleRoute } from "./routes/vehicle/vehicle"
import { verify } from "./routes/auth/verify"
import { errorHandler }  from './controllers/middleware/error-handler'
const origin = process.env.NODE_ENV === 'production' ? 'https://repair-order-tracker.vercel.app' : 'http://localhost:5173'

const app = express()

app.use(express.static(path.join(__dirname, 'build',)))
app.use(cors({ origin }))
app.use(helmet())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/', (req, res) => res.send('hello'))
app.use(verify)
app.use(registerRoute)
app.use(loginRoute)
app.use(userRoutes)
app.use(repairOrderRoutes)
app.use(vehicleRoute)
app.use('*', (req: Request, res: Response) => {
    throw new NotFoundError()
})
app.use(errorHandler)

export { app }