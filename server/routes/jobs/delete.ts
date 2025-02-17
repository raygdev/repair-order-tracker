import express from 'express'
import { deleteJob } from '../../controllers/jobs'
import { isAuthenticated } from '../../controllers/middleware/auth'

const router = express.Router()

router.delete('/api/jobs/:id', isAuthenticated, deleteJob)

export { router as deleteJobRouter }