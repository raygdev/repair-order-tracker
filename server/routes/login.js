const express = require('express')
const router = express.Router()

const userModel = require('../models/userModel')
const login = require('../controllers/userLoginController.js')

router.post('/api/login',login.userLoginController)

module.exports = router