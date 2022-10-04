const express = require('express')
const router = express.Router()

const userModel = require('../models/userModel')

router.post('/api/login',(req,res,next) => {
    userModel.findUserByEmailAndPassword(req.body,(err,user) => {
        if(err){
            console.log(err)
            return
        }else if(!user){
            console.log(`Can't seem to find the user`)
            return
        } else {
            console.log(user)
            return
        }
    })
})

module.exports = router