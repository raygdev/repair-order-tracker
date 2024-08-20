import { Request, Response, NextFunction } from "express";

import {
  findUserRepairOrders,
  deleteOneRepairOrderById,
  createRepairOrder,
  RepairOrderDoc
} from "../models/repair-order-model"
import { findUserById } from "../models/user-model"

export const getUser = (req: Request,res: Response, next: NextFunction) => {
  findUserById(req.params.userId,(err, user) => {

    if(err) return res.status(404).json({message:"something went wrong"});

    if(!user) return res.status(404).json({message:`Can't seem to find that user`});

    return res.status(200).json({
        ...user.toJSON()
    })
  })
}

export const getAllROs = (req: Request, res: Response, next: NextFunction) => {
  findUserRepairOrders(req.user!.id, (err, repairOrders) => {

    if (err) return res.status(404).json({ message: `No RO's found for this user` });

    if (!repairOrders) return res.status(404).json({ message: `No RO's found for this user` });

    return res.status(200).json(repairOrders);
  });
};

export const deleteOneRO = (req: Request, res: Response, next: NextFunction) => {
  let ro_id = req.body.ro_id;
  deleteOneRepairOrderById(ro_id, (err, doc) => {

    if (err) return res.status(404).json({ message: "Something went wrong deleting the RO" });

    if (!doc) return res.status(404).json({ message: "Could not find that RO" });

    return res.status(200).json({ message: `Deleted RO number ${(doc as RepairOrderDoc).ro_number} successfully!` });
  });
};

export const createOneRO = (req: Request, res: Response, next: NextFunction) => {
  createRepairOrder(req.body, (saved) => {
    // if (err) return res.status(404).json({ message: "Something went wrong saving the RO" });

    return res.status(200).json({ message: `Successfuly saved the RO` });
  });
};
