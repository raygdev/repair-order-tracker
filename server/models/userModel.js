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
    required: [true, "Must be a unique and valid email"],
  },
  password: {
    type: String,
    validator: {
        message: function(props){
            return 'Password is Required'
        }
    },
    required: [true, 'Password is required']
  },
  shop_name: { type: String },
  repair_orders: [RepairOrderSchema],
});

const User = mongoose.model("User", UserSchema);
/**
 *
 * @param {Object} userObj takes in a user object to create a new user
 * @param {callback} done callback returns either error or user
 *
 */

exports.createAndSaveUser = function(userObj, done) {
  const user = new User(userObj);
  user.save((err) => {
    if (err) return done(err, null);
    return done(null, user);
  });
}

exports.findUserByEmail = function(userObj, done){
    User.findOne(userObj, function(err, user){
        if(err){
            return done(err)
        } else if(!user){
            return done(null, false)
        } else {
            return done(null, user)
        }
    })
}

exports.UserSchema = UserSchema;


