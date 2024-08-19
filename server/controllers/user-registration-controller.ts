import { Request, Response, NextFunction } from 'express'

import { createAndSaveUser } from  "../models/user-model";
import { handleRegistrationError } from "../uitls/utils";

export const userRegitrationController = (req: Request, res: Response, next: NextFunction) => {
  createAndSaveUser(req.body, (err, newUser) => {
    if(err) return handleRegistrationError(res, err)
    return res.status(200).send({ message: "ok", you: newUser });
  });
}