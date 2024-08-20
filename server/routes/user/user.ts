import express, { RequestHandler } from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
const router = express.Router()

import { getUser } from '../../controllers/user-controllers'


// @ts-ignore
router.get('/api/user/:userId', isAuthenticated,  getUser )

export { router as userRoutes }