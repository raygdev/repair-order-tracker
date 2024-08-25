import express from 'express'
import { updateRepair } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'

const router = express.Router()

router.put('/repairorder/:id',
  isAuthenticated,
  updateRepair
)

export { router as updateRepairOrder }