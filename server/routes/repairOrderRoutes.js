const express = require('express')
const router = express.Router()
const ROcontrollers = require('../controllers/repairOrderControllers')

router.route('/')
    .post(ROcontrollers.createRepairOrder)
    .delete(ROcontrollers.deletRepairOrderById)
    .put(ROcontrollers.updateOneRepairOrderById)


module.exports = router