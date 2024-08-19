import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user-model'
import { config } from 'dotenv';
import { UserDoc } from '../../models/user-model';
config()

export interface GetAuthInfoRequest extends Request {
    user: UserDoc
}


exports.isAuthenticated = async (req: GetAuthInfoRequest, res: Response, next: NextFunction) => {
    let token;

  try {  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
        const user = await  User.findById(decoded.id).select('-password')

        
        req.user = user!
        
        next()
    } } catch (e) {
        console.log('token expired')

        res.status(401).json({message: 'Not Authorized'})
    }
    if(!token) return  res.status(401).json({message:'Not authorized, no token'})

    

}