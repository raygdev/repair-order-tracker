const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers.js')

router.get('/api/user/:userId',userController.getUser )

module.exports = router