const mongoose = require("mongoose");

const RepairOrderSchema = new mongoose.Schema({
  ro_number: { type: Number, require: true },
  isWarranty: { type: Boolean, required: true },
  tech_id: { type: String, required: true },
  vin: {
    type: String,
    lowercase: true,
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
});

module.exports = RepairOrderSchema;
