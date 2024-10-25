import { Request, Response } from "express";
import {
  RepairOrderAttributes,
  RepairOrders,
  getUserRepairOrders,
} from "../models/repair-order-model";
import {
  findVehicleByVin,
  getAndCreateVehicleInfo,
} from "../models/vehicle-model";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export async function createRepair(req: Request, res: Response) {
  const userId = req.user!.id;
  let { ro_number, isWarranty, vin, created_on, notes } =
    req.body as RepairOrderAttributes;

  if (!created_on) {
    created_on = new Date(Date.now());
  }

  let vehicle = await findVehicleByVin(vin);
  if (!vehicle) {
    vehicle = await getAndCreateVehicleInfo(vin).catch(
      // fail silently here so ro can still be created with
      // invalid vin
      () => console.log("something went wrong creating the vehicle")
    );
  }

  const repair = await RepairOrders.build({
    ro_number,
    isWarranty,
    vin,
    created_on,
    notes,
    userId,
  });

  await repair.save();

  res.status(200).send(repair);
}

export async function deleteRepair(req: Request, res: Response) {
  const id = req.params.id as string;
  const userId = req.user!.id;

  const repair = await RepairOrders.findById(id).exec();
  if (!repair) {
    throw new NotFoundError();
  }

  if (repair.userId !== userId) {
    throw new NotAuthorizedError();
  }

  await repair.delete();

  res
    .status(200)
    .json({ message: `Repair Order ${repair.ro_number} successfuly deleted` });
}

export async function updateRepair(req: Request, res: Response) {
  const id = req.params.id;
  const userId = req.user!.id;

  const { vin, created_on, notes, ro_number, isWarranty } =
    req.body as RepairOrderAttributes;

  const repair = await RepairOrders.findById(id).exec();

  if (!repair) {
    throw new NotFoundError();
  }

  if (repair.userId !== userId) {
    throw new NotAuthorizedError();
  }

  if (notes) {
    repair.set("notes", notes);
  }

  if (created_on) {
    repair.set("created_on", created_on);
  }

  repair.set("vin", vin);
  repair.set("ro_number", ro_number);
  repair.set("isWarranty", isWarranty);

  await repair.save();

  let vehicle = await findVehicleByVin(vin);

  if (!vehicle) {
    // I feel like this should really be handled separately
    // maybe create an endpoint and use an onblur in the client?
    vehicle = await getAndCreateVehicleInfo(vin).catch(() =>
      console.log("Something went wrong with creating the vehicle")
    );
  }

  res.json({
    message: "Success",
    repair,
  });
}

export async function getUserRepairs(req: Request, res: Response) {
    const userId = req.user!.id
    const repairs = await getUserRepairOrders(userId)

    res.json(repairs)
}
