import express from 'express'
import { createJob } from '../../controllers/jobs'
import { isAuthenticated } from '../../controllers/middleware/auth'

const router = express.Router()

router.post('/api/jobs/create', isAuthenticated, createJob)

export { router as createJobRouter }