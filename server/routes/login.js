const express = require('express')
const router = express.Router()

const userModel = require('../models/userModel')

router.post('/api/login',(req,res,next) => {
    userModel.findUserByEmailAndPassword(req.body,(err,user) => {
        if(err){
            res.send(err)
            return
        }else if(!user){
            res.status(404).send(`can't seem to find that user`)
            return
        } else if((req.body.email !== user.email) && (req.body.passord !== user.password)) {
            res.status(404).send(`username/password combination doesn't exist`)
            return
        } else {
            //toString() for ObjectId
            res.status(200).send(user)
            return
        }
    })
})

module.exports = router