const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const emailValidate =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const UserSchema = new mongoose.Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
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
  shopName: { type: String },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

UserSchema.virtual('repairOrders', {
  ref: 'RepairOrders',
  localField: '_id',
  foreignField: 'userId'
})


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

exports.createUser = async function (newUser) {
  try {
    const userToCreate = {
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10)
    }
    const user = new User(userToCreate)
    await user.save()
    return user
  } catch (e) {
    throw e
  }
}

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

exports.findByEmail = async function (emailObj) {
  try {
    const foundUser = User.findOne(emailObj).populate('repairOrders').exec()
    if(!foundUser) {
      return null
    }
    return foundUser
  } catch (e) {
    throw e
  }
}


/**
 * 
 * @param {string} userId the user's id
 * @param {callback} done callback returns either error or user
 */

exports.findUserById = function (userId,done){
  User.findById(userId)
      .populate({
        path: 'repairOrders',
        populate: {
          path: 'vehicle',
          select: '-id -_id -__v'
        }
      })
      .select("-password")
      .exec( (err, user) => {

          if(err) return done(err)

          if(!user) return done(null, false)

          return done(null, user)
      })
}

exports.findById = function (userId) {
  try {
    const user = User.findById(userId).populate('repairOrders').select('-password').exec()
    if(!user) {
      return null
    }
    return user
  } catch (e) {
    throw e
  }
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

exports.findAndPushRepairOrder = async function (userId,repairId) {
  try{
    const user = await User.findOne({_id: userId}).exec()
    user.repairOrders.push(repairId)
    await user.save()
    return user
  } catch (e) {
    throw e
  }
}

exports.User = User;
