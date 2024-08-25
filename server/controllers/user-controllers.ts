import { Request, Response, NextFunction } from "express";


import { findUserById } from "../models/user-model"

export const getUser = async (req: Request,res: Response, next: NextFunction) => {
  if(req.params.userId !== req.user!.id) return res.status(401).json({ message: 'Not Authorized' })
  findUserById(req.params.userId,async (err, user) => {

    if(err) return res.status(404).json({message:"something went wrong"});

    if(!user) return res.status(404).json({message:`Can't seem to find that user`});

    return res.status(200).json({
        ...user.toJSON()
    })
  })
}
