import express from 'express'
import { updateOneRepairOrderById } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'

const router = express.Router()

// @ts-ignore
router.put('/repairorder/:roId', isAuthenticated, updateOneRepairOrderById)

export { router as updateRepairOrder }