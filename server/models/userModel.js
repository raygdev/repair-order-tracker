const mongoose = require("mongoose");
const RepairOrderSchema = require("./repairOrderModel");

const emailValidate =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const UserSchema = new mongoose.Schema({
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

/**
 *
 * @param {Object} userObj takes in a user object to create a new user
 * @param {callback} done callback returns either error or user
 *
 */

function createAndSaveUser(userObj, done) {
  const User = mongoose.model("User", UserSchema);
  const user = new User(userObj);
  user.save((err) => {
    if (err) return done(err, null);
    return done(null, user);
  });
}
exports.UserSchema = UserSchema;
exports.createAndSaveUser = createAndSaveUser;
