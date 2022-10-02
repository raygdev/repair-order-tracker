const express = require("express");
const router = express.Router();
const { MongoServerError } = require('mongoose')

const {createAndSaveUser} = require("../models/userModel.js")


router.post("/api/register/user", (req, res, next) => {
 return  createAndSaveUser(req.body, (err, newUser) => {
    if (err) {
        console.log(err.message)
        console.log(err.message.includes('duplicate key'))
            if(err.message.includes('duplicate key')){
               return res.status(401).send({error: 'User Already Exists'})
            } else {
                return res.status(404).send({error: 'Unknow Error'})
            }
    } else {
        console.log('user block')
       return res.status(200).send({message: 'ok', you: newUser});
    }
  });
});


module.exports = router