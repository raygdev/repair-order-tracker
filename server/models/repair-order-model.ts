import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

// const mongoose = require("mongoose");
// const { User } = require('./userModel')

export interface RepairOrderAttributes {
  ro_number: number
  isWarranty: boolean
  userId: string
  vin: string
  created_on?: Date
  notes?: string
}

interface RepairOrderModel extends mongoose.Model<RepairOrderDoc>{
  build: (attrs: RepairOrderAttributes) => Promise<RepairOrderDoc>
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
  foreignField: 'VIN',
  justOne: true,
})

RepairOrderSchema.statics.build = async function (attrs: RepairOrderAttributes){
  return new RepairOrders(attrs)
}




//create a model for the repair order
export const RepairOrders = mongoose.model<RepairOrderDoc,RepairOrderModel>(
  "RepairOrders",
  RepairOrderSchema,
  "RepairOrders"
);


export const userRepairOrders = async function (userId: string) {
  const repairOrders = await RepairOrders.find({ userId }).exec()
  if(!repairOrders) {
    throw new NotFoundError()
  }
  return repairOrders
}

export const createRepair = async function (repairOrderObject: RepairOrderAttributes) {
  const repairOrder = new RepairOrders(repairOrderObject)
  await repairOrder.save()
  return repairOrder
}

export const deleteRepairById = async function (repairOrderId: string) {
  const deletedRepairOrder =  await RepairOrders.findByIdAndDelete(repairOrderId).exec()
  if(!deletedRepairOrder) {
    throw new NotFoundError()
  }
  return deletedRepairOrder
}

export const updateRepairOrder = async function (repairOrderId: string, repairToUpdate:RepairOrderDoc) {
    const repairOrder =  await RepairOrders.findByIdAndUpdate(repairOrderId, repairToUpdate).exec()
    if(!repairOrder) {
      throw new NotFoundError()
    }
    return repairOrder
}

export const getUserRepairOrders = (userId: string) => {
    const repairs = RepairOrders.find({ userId }).populate({
      path: 'vehicle',
      select: '-_id -__v -id'
    }).select('-vehicleId -__v').exec()

    if(!repairs) {
      throw new NotFoundError()
    }

    return repairs
}
// "Weeks of programming can save you hours of planning. - Unknown"