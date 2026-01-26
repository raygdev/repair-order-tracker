import express from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { deletePart } from '../../controllers/parts'

const router = express.Router()

router.delete('/api/parts/:id', isAuthenticated, deletePart)

export { router as deletePartsRouter }