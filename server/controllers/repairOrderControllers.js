const repairOrderModel = require('../models/repairOrderModel')
const userModel = require('../models/userModel.js')
const mongoose = require('mongoose')

function createRepairOrder(req,res,next){
    repairOrderModel.createRepairOrder(req.body,(err,repairOrder) => {
        if(err) {
            return res.status(409).json({message: "Something went wrong saving the RO"})
        } else {
            userModel.findUserAndPushRepairOrder(repairOrder.userId, repairOrder._id,(err,user) => {
                if(err){
                   return res.status(409).json({message:"couldn't save to user"})
                }
            })
            return res.json({message:'RO saved successfully'})
        }
    })
}

function deletRepairOrderById(req,res,next){
    const ro_id  = req.body.ro_id
    const userId = req.body.userId
    repairOrderModel.deleteOneRepairOrderById(ro_id,(err, doc) => {
        if (err){
            res.status(409).json({message:'Something went wrong deleting the repair order'})
        } else if(!doc){
            res.status(404).json({message: `repair order with id ${ro_id} does not exist`})
        } else {
            userModel.User.findOneAndUpdate({_id:userId},{$pull:{repairOrders: mongoose.Types.ObjectId(ro_id)}},function (err,user){
                if(err) {
                    console.log(err)
                } else if(!user){
                    console.log(`couldn't find user`)
                } else {
                    console.log(`repair order removed from user with id: ${user._id}`)
                }
            })
            res.json({message: `repiar order ${doc.ro_number} successfuly deleted`})
        }
    })
}

module.exports = {
    createRepairOrder,
    deletRepairOrderById
}