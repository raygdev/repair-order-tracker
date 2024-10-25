import { Request, Response, NextFunction } from "express";


import { findUserById } from "../models/user-model"

export const getUser = async (req: Request,res: Response, next: NextFunction) => {
  const user = await findUserById(req.user!.id)
  res.json(user)
}
