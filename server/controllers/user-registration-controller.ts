import { Request, Response, NextFunction } from 'express'

import { createUser } from  "../models/user-model";
import { handleRegistrationError } from "../uitls/utils";

export const userRegitrationController = async (req: Request, res: Response, next: NextFunction) => {

 const user = await createUser(req.body)

 res.status(200).json({ message: 'ok', you: user })
}