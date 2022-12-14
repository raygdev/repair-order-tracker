const express = require('express')
const router = express.Router()
const ROcontrollers = require('../controllers/repairOrderControllers')
const {isAuthenticated} = require('../controllers/middleware/authMiddleware')

router.route('/')
    .post(isAuthenticated, ROcontrollers.createRepairOrder)
    .delete(isAuthenticated, ROcontrollers.deletRepairOrderById)
    .put(isAuthenticated, ROcontrollers.updateOneRepairOrderById)


module.exports = router