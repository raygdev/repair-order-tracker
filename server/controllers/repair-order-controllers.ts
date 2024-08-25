import { Request, Response, NextFunction } from "express";
import {
  RepairOrderAttributes,
  RepairOrders,
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
    vehicle = getAndCreateVehicleInfo(vin).catch(
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

export function deletRepairOrderById(req: Request,res: Response,next: NextFunction){

    const roId  = req.params.roId
    const userId = req.user!.id

    deleteOneRepairOrderById(roId, (err, doc) => {

        if(!doc) return res.status(404).json({message: `repair order with id ${roId} does not exist`})

        if(doc.userId !== userId){
            console.log(`[roId]: ${roId}\n[userId]: ${userId}\n[docUserId]: ${doc.userId}`)
            return res.status(409).json({message:'This RO doesn\'t belong to this user'})
        }

        if(err) return res.status(409).json({message:'Something went wrong deleting the repair order'})


        console.log(`repair order removed from user with id: ${userId}`)

        res.json({message: `repiar order ${doc.ro_number} successfuly deleted`})

    })
}

export function updateOneRepairOrderById(req: Request, res: Response, next: NextFunction){
    const roId = req.params.roId
    const vin = req.body.vin
    updateOneRepairOrder(roId, req.body, (err,ro)=> {

        getVehicle(vin, (vehicleError: string, vehicle: any) => {
            if(vehicleError) console.log(vehicleError)
            if(!vehicle) {
                console.log(vehicle)
                createVehicle(vin, (createError: any) =>{
                    if(createError) console.log(createError)
                        if(err) return res.status(404).json({message:'Something went wrong updating the RO'})
                        if(!ro) return res.status(404).json({message:'Could not find that RO'})
                        return res.json({message:'success', ro})
                    
                })
            } else {
                if(err) return res.status(404).json({message:'Something went wrong updating the RO'})
                if(!ro) return res.status(404).json({message:'Could not find that RO'})
                return res.json({message:'success', ro})
            }
        })
        
    })
}