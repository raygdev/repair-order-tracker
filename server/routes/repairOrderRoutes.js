const express = require('express')
const router = express.Router()
const ROcontrollers = require('../controllers/repairOrderControllers')
const {isAuthenticated} = require('../controllers/middleware/authMiddleware')

router
    .post("/repairorder",isAuthenticated, ROcontrollers.createRepairOrder)
    .delete("/repairorder/:id",isAuthenticated, ROcontrollers.deletRepairOrderById)
    .put("/repairorder/:id",isAuthenticated, ROcontrollers.updateOneRepairOrderById)


module.exports = router