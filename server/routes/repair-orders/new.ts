import express from 'express'
import { createRepairOrder } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { validateRequest, validateRepairOrderCreation } from '../../controllers/middleware/validation'


const router = express.Router()

router.post('/repairorder',
  isAuthenticated,
  validateRepairOrderCreation,
  validateRequest,
  createRepairOrder
)

export { router as newRepairOrder }