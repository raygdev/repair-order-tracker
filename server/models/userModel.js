const mongoose = require("mongoose");
const RepairOrderSchema = require("./repairOrderModel");
const bcrypt = require('bcrypt')

const emailValidate =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const UserSchema = new mongoose.Schema({
  name: {
    first: {type:String, required:true},
    last: {type:String, required:true},
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
      message: function (props) {
        return "Password is Required";
      },
    },
    required: [true, "Password is required"],
  },
  shop_name: { type: String },
  repairOrders:[{ type: mongoose.Schema.Types.ObjectId, ref:'RepairOrder'}]
});



const User = mongoose.model("users", UserSchema, "users");
/**
 *
 * @param {Object} userObj takes in a user object to create a new user
 * @param {callback} done callback returns either error or user
 *
 */

exports.createAndSaveUser = function (userObj, done) {
  const newUser = {
    ...userObj,
    password: bcrypt.hashSync(userObj.password,10)
  }
  const user = new User(newUser);
  user.save((err) => {
    if (err) return done(err, null);
    return done(null, user);
  });
};

/**
 * 
 * @param {Object} emailObj object containing the users email
 * @param {callback} done callback returns either error or user
 */

exports.findUserByEmail = function (emailObj, done) {
  User.findOne(emailObj, function (err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
};

exports.findUserById = function (userId,done){
  User.findById(userId, (err, user) => {
    if(err){
      return done(err)
    }else if(!user) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  })
}

exports.UserSchema = UserSchema;
