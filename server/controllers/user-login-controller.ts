import { Request, Response, NextFunction } from 'express'
import { findUserByEmail } from "../models/user-model";
import  bcrypt from "bcrypt";
import  { generateToken } from './middleware/token-util'

export const userLoginController = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(404).json({message: 'Both fields  are required'})

  findUserByEmail({ email: email }, (err, user) => {

    if (err) return res.send(err);

    if (!user) return res.status(404).json({ message: `username/password combination doesn't exist` });

    if (!bcrypt.compareSync(password, user.password)) return res.status(404).json({ message: `username/password combination doesn't exist` });

    delete user._doc.password
    
    return res.status(200).json({...user._doc, token: generateToken(user.id)});
  });
};
