const mongoose = require("mongoose");
const RepairOrderSchema = require("./repairOrderModel");

const UserSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  repair_orders:[RepairOrderSchema]
});
