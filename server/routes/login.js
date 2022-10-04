const express = require('express')
const router = express.Router()

router.post('/api/login',(req,res,next) => {
    console.log('in the login route')
    next()
})

module.exports = router