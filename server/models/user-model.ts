import  mongoose from 'mongoose'
import  bcrypt from 'bcrypt'
import { RepairOrderAttributes } from './repair-order-model'
import { NotFoundError } from '../errors/not-found-error'

export interface UserAttributes {
  _id: string
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  shopName?: string
  repairOrders: RepairOrderAttributes[]
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttributes) => UserDoc
}

export interface UserDoc {
  _id: string
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  shopName?: string
  repairOrders: mongoose.Types.ObjectId[]
}

type DoneCallback = (err:any, user?: any) => void

const emailValidate =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const UserSchema = new mongoose.Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v: string) {
        return emailValidate.test(v);
      },
      message: function () {
        return "Email is invalid";
      },
    },
    required: [true, "Must be a unique and valid email"],
  },
  password: {
    type: String,
    validator: {
      message: function () {
        return "Password is Required";
      },
    },
    required: [true, "Password is required"],
  },
  shopName: { type: String, default: '' },
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id
    }
  },
  toObject: { virtuals: true }
});

UserSchema.virtual('repairOrders', {
  ref: 'RepairOrders',
  localField: '_id',
  foreignField: 'userId'
})

UserSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, 10)
})


const User = mongoose.model<UserDoc, UserModel>("users", UserSchema, "users");
/**
 *
 * @param {Object} userObj takes in a user object to create a new user
 * @param {callback} done callback returns either error or user
 *
 */

export const createAndSaveUser = function (newUser:UserAttributes, done: DoneCallback) {
  // const newUser = {
  //   ...userObj,
  //   password: bcrypt.hashSync(userObj.password,10)
  // }

  const user = new User(newUser);

  user.save((err) => {

    if (err) return done(err, null);

    return done(null, user);

  });
};

export const createUser = async function (newUser: UserAttributes) {
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
 * @param {Object} email object containing the users email
 * @param {callback} done callback returns either error or user
 */

export const findUserByEmail = function (email: { email: string }, done: DoneCallback) {
  User.findOne(email)
      .populate('repairOrders')
      .exec(function (err, user) {

        if(err) return done(err);

        if (!user) return done(null, false);
        
        return done(null, user);
    
      });
};

export const findByEmail = async function (email: { email: string }) {
  try {
    const foundUser = await User.findOne(email).populate('repairOrders').exec()
    if(!foundUser) {
      return null
    }
    return foundUser
  } catch (e) {
    throw e
  }
}

export const findUserById = async function (userId: string) {
  const user = await User.findById(userId).select('-password -__v').exec()
  if(!user) {
    throw new NotFoundError()
  }
  return user
}

/**
 * 
 * @param {string} userId the user's id
 * @param {string} roId the id of the RO to push to users repairOrders path
 * @param {callback} done callback that returns either error or user
 */

export const findUserAndPushRepairOrder = function(userId: string,roId: string,done: DoneCallback){
   User.findOne({_id:userId},function (err: mongoose.CallbackError,user: any){

    if(err) return done(err)
    if(!user) return done(null,false)

    user.repairOrders.push(roId)

    user.save((err: mongoose.CallbackError) => {

      if(err) return done(err)
      return done(null, user)

    })
  })
}

export const findAndPushRepairOrder = async function (userId: string,repairId: mongoose.Types.ObjectId) {
  try{
    const user = await User.findOne({_id: userId}).exec()
    user?.repairOrders.push(repairId)
    await user?.save()
    return user
  } catch (e) {
    throw e
  }
}

export { User } 
