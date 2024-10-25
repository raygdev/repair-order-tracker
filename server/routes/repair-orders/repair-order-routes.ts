import express from 'express'
import { newRepairOrder } from './new'
import { deleteRepairOrder } from './delete'
import { updateRepairOrder } from './update'
import { getAllRepairOrders } from './all'

const router = express.Router()

router.use(newRepairOrder)
router.use(deleteRepairOrder)
router.use(updateRepairOrder)
router.use(getAllRepairOrders)


export { router as repairOrderRoutes }