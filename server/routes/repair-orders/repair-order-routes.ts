import express from 'express'
import { newRepairOrder } from './new'
import { deleteRepairOrder } from './delete'
import { updateRepairOrder } from './update'

const router = express.Router()

router.use(newRepairOrder)
router.use(deleteRepairOrder)
router.use(updateRepairOrder)


export { router as repairOrderRoutes }