const mongoose = require("mongoose");
const RepairOrderSchema = require("./repairOrderModel");

const emailValidate =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const UserSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return emailValidate.test(v);
      },
      message: function (props) {
        return "Email is invalid";
      },
    },
    required: [true, "Must be a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  shop_name: { type: String },
  repair_orders: [RepairOrderSchema],
});

module.exports = UserSchema;
