const repairOrderModel = require('../models/repairOrderModel')
const userModel = require('../models/userModel')

function createRepairOrder(req,res,next){
    repairOrderModel.createRepairOrder(req.body,(err,repairOrder) => {
        if(err) {
            return res.status(409).json({message: "Something went wrong saving the RO"})
        } else {
            userModel.findUserAndPushRepairOrder(repairOrder.userId, repairOrder._id,(err,user) => {
                if(err){
                   return res.status(409).json({message:"could't save to user"})
                }
            })
            return res.json({message:'RO saved successfully'})
        }
    })
}

module.exports = {
    createRepairOrder
}