import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

// const mongoose = require("mongoose");
// const { User } = require('./userModel')

export interface RepairOrderAttributes {
  _id: string
  id: string
  ro_number: number
  isWarranty: boolean
  userId: string
  vin: string
  created_on?: Date
  notes?: string
}

interface RepairOrderModel extends mongoose.Model<RepairOrderDoc>{
  build: (attrs: RepairOrderAttributes) => RepairOrderDoc
}

export interface RepairOrderDoc extends mongoose.Document{
  _id: string
  id: string
  ro_number: number
  isWarranty: boolean
  userId: string
  vin: string
  created_on?: Date
  notes?: string
}

type Done = (err: mongoose.CallbackError, repiarOrder?: RepairOrderDoc | false | null) => void

const RepairOrderSchema = new mongoose.Schema({
  ro_number: { type: Number, require: true },
  isWarranty: { type: Boolean, required: true },
  userId: { type: String, required: true },
  vin: {
    type: String,
    uppercase: true,
    trim: true,
    validate: {
      validator: function (v:string) {
        return /\w{17}/.test(v);
      },
      message: (props: { value: string}) => `${props.value} is not a valid vin!`,
    },
    required: [true, "vin is required, must be 17 characters"],
  },
  created_on: { type: Date, default: new Date() },
  notes: { type: String, default: "" },
},{ 
  toJSON: { 
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id
    }
  },
  toObject: { virtuals: true} 
});

RepairOrderSchema.virtual('vehicle', {
  ref: 'vehicles',
  localField: 'vin',
  foreignField: 'VIN'
})

RepairOrderSchema.statics.build = function (attrs: RepairOrderAttributes) {
  return new RepairOrders(attrs)
}


//create a model for the repair order
export const RepairOrders = mongoose.model<RepairOrderDoc,RepairOrderModel>(
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

export const findUserRepairOrders = function (userId: string, done: Done) {

  RepairOrders.find({ userId: userId }, (err: any, repairOrders: RepairOrderDoc) => {

    if (err) return done(err);

    if (!repairOrders) return done(null, false);
    
    return done(null, repairOrders);
  });
};

//TODO: Change name once verified functional

export const userRepairOrders = async function (userId: string) {
  const repairOrders = await RepairOrders.find({ userId }).exec()
  if(!repairOrders) {
    throw new NotFoundError()
  }
  return repairOrders
}

/**
 * 
 * @param {Object} repairOrderObject an object passed to create the repair order
 * @param {callback} done return the repairOrder to be saved
 */

export const createRepairOrder = function (repairOrderObject:RepairOrderAttributes, done: (repairOrders: RepairOrderDoc) => void) {
  const repairOrder = new RepairOrders(repairOrderObject);
  return done(repairOrder);
};

//TODO: Change name once verified functional
export const create = async function (repairOrderObject: RepairOrderAttributes) {
  const repairOrder = new RepairOrders(repairOrderObject)
  await repairOrder.save()
  return repairOrder
}

/**
 * 
 * @param {string} repairOrderId the repair order id to be deleted
 * @param {callback} done return an error or the doc if found
 */

export const deleteOneRepairOrderById = function (repairOrderId: string, done: Done) {

  RepairOrders.findByIdAndDelete(repairOrderId, (err: mongoose.CallbackError ,doc: RepairOrderDoc) => {

    if (err) return done(err);

    if(!doc) return done(null, false);

    return done(null, doc)
  });
};

//TODO: Change name once verified functional

export const deleteRepairById = async function (repairOrderId: string) {
  const deletedRepairOrder =  await RepairOrders.findByIdAndDelete(repairOrderId).exec()
  if(!deletedRepairOrder) {
    return null
  }
  return deletedRepairOrder
}

/**
 * 
 * @param {string} tech_id is the technicians user id from the user's doc
 * @param {callback} done return the error or the count of all the docs deleted
 */
export const deleteAllRepairOrders = function(tech_id: string, done: Done){

  RepairOrders.deleteMany({tech_id:tech_id}, (err:mongoose.CallbackError, doc: any) => {

      if(err) return done(err)

      return done(null, doc.deletedCount)
  })
}

export const updateOneRepairOrder = function(ro_id: string, updateObj: RepairOrderDoc, done: Done){

  RepairOrders.findByIdAndUpdate(ro_id,updateObj,function(err: mongoose.CallbackError,ro: RepairOrderDoc){

    if(err) return done(err)

    if(!ro) return done(null,false)
    
    return done(null, ro)
  })
}

//TODO: Change name once verified functional

export const updateRepairOrder = async function (repairOrderId: string, repairToUpdate:RepairOrderDoc) {

    const repairOrder =  await RepairOrders.findByIdAndUpdate(repairOrderId, repairToUpdate).exec()
    if(!repairOrder) {
      return null
    }
    return repairOrder

}
// "Weeks of programming can save you hours of planning. - Unknown"