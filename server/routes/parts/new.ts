import express from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { createPart } from '../../controllers/parts'

const router = express.Router()

router.post('/api/parts/create', isAuthenticated, createPart)

export { router as createPartsRouter }