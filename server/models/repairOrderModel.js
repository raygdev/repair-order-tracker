const mongoose = require("mongoose");

const RepairOrderSchema = new mongoose.Schema({
  ro_number: { type: Number, require: true },
  isWarranty: { type: Boolean, required: true },
  tech_id: { type: String, required: true },
  vin: {
    type: String,
    uppercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /\w{17}/.test(v);
      },
      message: (props) => `${props.value} is not a valid vin!`,
    },
    required: [true, "vin is required, must be 17 characters"],
  },
  created_on: { type: Date, default: new Date() },
  notes: {type: String, default: ''}
});

//create a model for the repair order
const RepairOrder = mongoose.model('RepairOrder',RepairOrderSchema,'RepairOrder')

module.exports = RepairOrderSchema;

exports.findUserRepairOrders = function (userId, done){
  RepairOrder.find({tech_id: userId}, (err, repairOrders) =>{
    if(err){
      return done(err)
    } else if(!repairOrders){
      return done(null, false)
    } else {
      done(null, repairOrders)
    }
  })
}

exports.createRepairOrder = function (repairOrderObject,done){
  const repairOrder = new RepairOrder(repairOrderObject)
  repairOrder.save((err) => {
    if(err){
      return done(err)
    }else {
      done(null, user)
    }
  })
}