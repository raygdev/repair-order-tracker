import express from 'express'
import { createRepairOrder } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'


const router = express.Router()
// @ts-ignore
router.post('/repairorder', isAuthenticated, createRepairOrder)

export { router as newRepairOrder }