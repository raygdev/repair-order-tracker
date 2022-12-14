const jwt = require('jsonwebtoken')
const { User } = require('../../models/userModel')
require('dotenv').config()


exports.isAuthenticated = async (req, res, next) => {
    let token;

  try {  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        
        req.user = await  User.findById(decoded.id).select('-password')
        // req.user.id === string
        //req.user._id === ObjectId(string)
        
        next()
    } } catch (e) {
        console.log('token expired')

        res.status(401).json({message: 'Not Authorized'})
    }
    if(!token) return  res.status(401).json({message:'Not authorized, no token'})

    

}