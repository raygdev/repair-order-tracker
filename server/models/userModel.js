const mongoose = require("mongoose")
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
  repairOrders:[{ type: mongoose.Schema.Types.ObjectId, ref:'RepairOrders'}]
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
  User.findOne(emailObj)
      .populate('repairOrders')
      .exec(function (err, user) {

        if(err) return done(err);

        if (!user) return done(null, false);
        
        return done(null, user);
    
      });
};


/**
 * 
 * @param {string} userId the user's id
 * @param {callback} done callback returns either error or user
 */

exports.findUserById = function (userId,done){
  User.findById(userId)
      .populate('repairOrders')
      .select("-password")
      .exec( (err, user) => {

          if(err) return done(err)

          if(!user) return done(null, false)

          return done(null, user)
      })
}

/**
 * 
 * @param {string} userId the user's id
 * @param {string} roId the id of the RO to push to users repairOrders path
 * @param {callback} done callback that returns either error or user
 */

exports.findUserAndPushRepairOrder = function(userId,roId,done){
   User.findOne({_id:userId},function (err,user){

    if(err) return done(err)
    if(!user) return done(null,false)

    user.repairOrders.push(roId)

    user.save((err) => {

      if(err) return done(err)
      return done(null, user)

    })
  })
}

exports.User = User;
