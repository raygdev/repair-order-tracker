import express from 'express'
import mongoose from 'mongoose'
import { param } from 'express-validator'
import { deleteRepair } from '../../controllers/repair-order-controllers'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { validateRequest } from '../../controllers/middleware/validation'

const router = express.Router()

router.delete('/repairorder/:id',
  isAuthenticated,
  [
    param('id')
      .trim()
      .custom(value => mongoose.Types.ObjectId.isValid(value))
      .withMessage('a valid id must be provided in the url')
  ],
  validateRequest,
  deleteRepair
)

export { router as deleteRepairOrder }