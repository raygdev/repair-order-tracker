const repairOrderModel = require('../models/repairOrderModel')
const userModel = require('../models/userModel.js')
const mongoose = require('mongoose')

function createRepairOrder(req,res,next){
    let userObj = req.body

    if(!userObj.created_on){
        userObj = {
            ...userObj,
            created_on: Date.now()
        }
    }

    repairOrderModel.createRepairOrder(userObj,(err,repairOrder) => {

        if(err) return res.status(409).json({message: "Something went wrong saving the RO"})

        userModel.findUserAndPushRepairOrder(repairOrder.userId, repairOrder._id,(err,user) => {

            if(err) return res.status(409).json({message:"couldn't save to user"})

        })

        return res.json({message:'RO saved successfully'})

    })
}

function deletRepairOrderById(req,res,next){

    const ro_id  = req.body.ro_id
    const userId = req.body.userId

    repairOrderModel.deleteOneRepairOrderById(ro_id, (err, doc) => {

        if(err) return res.status(409).json({message:'Something went wrong deleting the repair order'})

        if(!doc) return res.status(404).json({message: `repair order with id ${ro_id} does not exist`})

        userModel.User.findOneAndUpdate({_id:userId},{$pull:{repairOrders: mongoose.Types.ObjectId(ro_id)}},function (err,user){

            if(err) return console.log(err)

            if(!user) return console.log(`couldn't find user`)

            console.log(`repair order removed from user with id: ${user._id}`)

            })

        res.json({message: `repiar order ${doc.ro_number} successfuly deleted`})

    })
}

function updateOneRepairOrderById(req, res, next){
    const id = req.body._id
    repairOrderModel.updateOneRepairOrder(id, req.body, (err,ro)=> {

        if(err) return res.status(404).json({message:'Something went wrong updating the RO'})

        if(!ro) return res.status(404).json({message:'Could not find that RO'})

        return res.json({message:'success', ro})
    })
}

module.exports = {
    createRepairOrder,
    deletRepairOrderById,
    updateOneRepairOrderById
}