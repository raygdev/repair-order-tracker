const mongoose = require("mongoose");
const { User } = require('./userModel')

const RepairOrderSchema = new mongoose.Schema({
  ro_number: { type: Number, require: true },
  isWarranty: { type: Boolean, required: true },
  userId: { type: String, required: true },
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
  notes: { type: String, default: "" },
},{ toJSON: { virtuals: true }, toObject: { virtuals: true} });

RepairOrderSchema.virtual('vehicle', {
  ref: 'vehicles',
  localField: 'vin',
  foreignField: 'VIN'
})


//create a model for the repair order
const RepairOrders = mongoose.model(
  "RepairOrders",
  RepairOrderSchema,
  "RepairOrders"
);

// module.exports = RepairOrderSchema;

/**
 * 
 * @param {string} userId the id of the user to find their ROs
 * @param {callback} done returns either error or the array of repair orders found
 */

exports.findUserRepairOrders = function (userId, done) {

  RepairOrders.find({ userId: userId }, (err, repairOrders) => {

    if (err) return done(err);

    if (!repairOrders) return done(null, false);
    
    return done(null, repairOrders);
  });
};

//TODO: Change name once verified functional

exports.userRepairOrders = async function (userId) {
  try {
    const repairOrders = await RepairOrders.find({ userId }).exec()
    if(!repairOrders) {
      return null
    }
    return repairOrders
  } catch(e) {
    throw e
  }
}

/**
 * 
 * @param {Object} repairOrderObject an object passed to create the repair order
 * @param {callback} done return the repairOrder to be saved
 */

exports.createRepairOrder = function (repairOrderObject, done) {
  const repairOrders = new RepairOrders(repairOrderObject);
  return done(repairOrders);
};

//TODO: Change name once verified functional
exports.create = async function (repairOrderObject) {
  try {
    const repairOrder = new RepairOrders(repairOrderObject)
    await repairOrder.save()
    return repairOrder
  } catch (e) {
    throw e
  }
}

/**
 * 
 * @param {string} repairOrderId the repair order id to be deleted
 * @param {callback} done return an error or the doc if found
 */

exports.deleteOneRepairOrderById = function (repairOrderId, done) {

  RepairOrders.findByIdAndDelete(repairOrderId, (err,doc) => {

    if (err) return done(err);

    if(!doc) return done(null, false);

    return done(null, doc)
  });
};

//TODO: Change name once verified functional

exports.deleteRepairById = async function (repairOrderId) {
  try {
    const deletedRepairOrder =  await RepairOrders.findByIdAndDelete(repairOrderId).exec()
    if(!deletedRepairOrder) {
      return null
    }
    return deletedRepairOrder
  } catch (e) {
    throw e
  }
}

/**
 * 
 * @param {string} tech_id is the technicians user id from the user's doc
 * @param {callback} done return the error or the count of all the docs deleted
 */
exports.deleteAllRepairOrders = function(tech_id,done){

  RepairOrders.deleteMany({tech_id:tech_id}, (err,doc) => {

      if(err) return done(err)

      return done(null, doc.deletedCount)
  })
}

exports.updateOneRepairOrder = function(ro_id, updateObj, done){

  RepairOrders.findByIdAndUpdate(ro_id,updateObj,function(err,ro){

    if(err) return done(err)

    if(!ro) return done(null,false)
    
    return done(null, ro)
  })
}

//TODO: Change name once verified functional

exports.updateRepairOrder = async function (repairOrderId, repairToUpdate) {

  try {
    const repairOrder =  await RepairOrders.findByIdAndUpdate(repairOrderId, repairToUpdate).exec()
    if(!repairOrder) {
      return null
    }
    return repairOrder
  } catch (e) {
    throw e
  }

}
// "Weeks of programming can save you hours of planning. - Unknown"