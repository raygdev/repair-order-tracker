const repairOrderModel = require('../models/repairOrderModel')
const userModel = require('../models/userModel.js')
const mongoose = require('mongoose')
const vehicleModel = require("../models/vehicleModel.js")

function createRepairOrder(req,res,next){
    let userId = req.user.id
    let userObj = { ...req.body, userId }

    if(!userObj.created_on){
        userObj.created_on = Date.now()
    }
    if(!userObj.vin || !/\w{17}/.test(userObj.vin)){ 
        return res.status(422).json({message: "VIN is required and must be 17 characters in length"})
    }

    repairOrderModel.createRepairOrder(userObj,(repairOrder) => {

        userModel.findUserAndPushRepairOrder(userId, repairOrder.id,(err,user) => {
            //if an error pushing the id to the user return error message
            if(err) return res.status(409).json({message:"couldn't save to user"})
            //else find the vehicle by vin
            vehicleModel.getVehicle(userObj.vin,(findVehicleError, foundVehicle) => {
                //if an error return the error looking for the vehicle
                if(findVehicleError) return res.status(409).json({message: findVehicleError})
                // if the vehicle isn't found
                if(!foundVehicle){
                    //create a new vehicle
                    vehicleModel.createVehicle(userObj.vin,(newVehicleError, newVehicle) => {
                        //if there's an error creating the vehicle... respond with the error
                        if(newVehicleError) return res.status(409).json({message: newVehicleError})
                        //else finally save the repair order
                        repairOrder.save((repairOrderSaveError) => {
                            //if there is an error saving... response with an error message
                            if(repairOrderSaveError) return res.status(409).json({message: "Something went wrong saving the RO"})
                            //else response that it was saved successfully
                            return res.json({message:'RO saved successfully'})
                        })
                    })
                } else {
                    //else if the vehicle is found save the repair order
                    repairOrder.save((repairOrderSaveError) => {
                        // if there is an error saving, respond with an error message
                        if(repairOrderSaveError) return res.status(409).json({message: "Something went wrong saving the RO"})
                        //else respond with a success message
                        return res.json({message: "RO saved successfully"})

                    })
                }
            })
        })
    })
}

function deletRepairOrderById(req,res,next){

    const roId  = req.params.roId
    const userId = req.user.id

    repairOrderModel.deleteOneRepairOrderById(roId, (err, doc) => {

        if(err) return res.status(409).json({message:'Something went wrong deleting the repair order'})

        if(!doc) return res.status(404).json({message: `repair order with id ${roId} does not exist`})

        userModel.User.findOneAndUpdate({_id:userId},{$pull:{repairOrders: mongoose.Types.ObjectId(roId)}},function (err,user){

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