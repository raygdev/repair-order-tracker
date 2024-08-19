const express = require('express')
const router = express.Router()
import {
    createRepairOrder,
    deletRepairOrderById,
    updateOneRepairOrderById
} from '../controllers/repair-order-controllers'
import { isAuthenticated } from '../controllers/middleware/auth'

router
    .post("/repairorder",isAuthenticated, createRepairOrder)
    .delete("/repairorder/:roId",isAuthenticated, deletRepairOrderById)
    .put("/repairorder/:roId",isAuthenticated, updateOneRepairOrderById)


export { router as repairOrderRoutes }