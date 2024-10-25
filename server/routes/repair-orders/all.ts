import express from 'express'
import { isAuthenticated } from '../../controllers/middleware/auth'
import { getUserRepairs } from '../../controllers/repair-order-controllers'

const router = express.Router()

router.get('/api/repairorders', 
    isAuthenticated,
    getUserRepairs
)

export { router as getAllRepairOrders }