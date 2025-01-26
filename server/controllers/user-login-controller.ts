import { Request, Response, NextFunction } from 'express'
import { findByEmail } from "../models/user-model";
import  bcrypt from "bcrypt";
import  { generateToken } from './middleware/token-util'

export const userLoginController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(404).json({message: 'Both fields  are required'})

  const foundUser = await findByEmail(email)

  if (!foundUser) return res.status(404).json({ message: `username/password combination doesn't exist` });
  if (!bcrypt.compareSync(password, foundUser.password)) return res.status(404).json({ message: `username/password combination doesn't exist` });

  const user = foundUser.toJSON()

  return res.status(200).json({...user, password: null, token: generateToken(user.id)});
};
