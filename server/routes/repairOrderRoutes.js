const express = require('express')
const router = express.Router()
const ROcontrollers = require('../controllers/repairOrderControllers')

router.route('/')
    .post(ROcontrollers.createRepairOrder)


module.exports = router