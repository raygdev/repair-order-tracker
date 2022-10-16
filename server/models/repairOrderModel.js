const mongoose = require("mongoose");

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
});

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
  RepairOrders.find({ tech_id: userId }, (err, repairOrders) => {
    if (err) {
      return done(err);
    } else if (!repairOrders) {
      return done(null, false);
    } else {
      return done(null, repairOrders);
    }
  });
};

/**
 * 
 * @param {Object} repairOrderObject an object passed to create the repair order
 * @param {callback} done return an error or true if doc was successfully save
 */

exports.createRepairOrder = function (repairOrderObject, done) {
  const repairOrders = new RepairOrder(repairOrderObject);
  repairOrder.save((err) => {
    if (err) {
      return done(err);
    } else {
      return done(null, true);
    }
  });
};

/**
 * 
 * @param {string} repairOrderId the repair order id to be deleted
 * @param {callback} done return an error or the doc if found
 */

exports.deleteOneRepairOrderById = function (repairOrderId, done) {
  RepairOrders.findByIdAndDelete(repairOrderId, (err,doc) => {
    if (!err) {
      return done(err);
    } else if(!doc){
      return done(null, false);
    } else {
      return done(null, doc)
    }
  });
};

/**
 * 
 * @param {string} tech_id is the technicians user id from the user's doc
 * @param {callback} done return the error or the count of all the docs deleted
 */

exports.deleteAllRepairOrders = function(tech_id,done){
  RepairOrders.deleteMany({tech_id:tech_id}, (err,doc) => {
      if(err) {
        return done(err)
      }else {
        return done(null, doc.deletedCount)
      }
  })
}
