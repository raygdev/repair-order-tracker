import express from 'express'
import { deletRepairOrderById } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'

const router = express.Router()

router.delete('/repairorder/:roId', isAuthenticated, deletRepairOrderById)

export { router as deleteRepairOrder }