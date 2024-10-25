import express, { RequestHandler } from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
const router = express.Router()

import { getUser } from '../../controllers/user-controllers'

router.get('/api/user/', isAuthenticated,  getUser )

export { router as userRoutes }