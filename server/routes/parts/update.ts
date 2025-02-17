import express from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { updatePart } from '../../controllers/parts'

const router = express.Router()

router.patch('/api/parts/:id', isAuthenticated, updatePart)

export { router as updatePartsRouter }