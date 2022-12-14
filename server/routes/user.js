const express = require('express')
const router = express.Router()
const authMiddleware = require('../controllers/middleware/authMiddleware')

const userController = require('../controllers/userControllers.js')

router.get('/api/user/:userId', authMiddleware.isAuthenticated,  userController.getUser )

module.exports = router