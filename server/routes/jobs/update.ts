import express from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { updateJob } from '../../controllers/jobs'

const router = express.Router()

router.patch('/api/jobs/:id', isAuthenticated, updateJob)

export { router as updateJobRouter }