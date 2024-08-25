import { Request, Response, NextFunction } from "express";
import {
  RepairOrderAttributes,
  RepairOrders,
} from "../models/repair-order-model";
import {
    getVehicle,
    createVehicle
} from "../models/vehicle-model"

export function createRepairOrder(req: Request,res: Response,next: NextFunction){
    let userId = req.user!.id
    let userObj = { ...req.body, userId }

    if(!userObj.created_on){
        userObj.created_on = Date.now()
    }
    if(!userObj.vin || !/\w{17}/.test(userObj.vin)){ 
        return res.status(422).json({message: "VIN is required and must be 17 characters in length"})
    }

    createRepair(userObj,(repairOrder) => {
        getVehicle(userObj.vin,(findVehicleError: string, foundVehicle: any) => {
            //if an error return the error looking for the vehicle
            if(findVehicleError) return res.status(409).json({message: findVehicleError})
            // if the vehicle isn't found
            if(!foundVehicle){
                //create a new vehicle
                createVehicle(userObj.vin,(newVehicleError: any, newVehicle: any) => {
                    //if there's an error creating the vehicle... respond with the error
                    if(newVehicleError) console.log(newVehicleError) /*res.status(409).json({message: newVehicleError})*/
                    //else finally save the repair order
                    repairOrder.save((repairOrderSaveError) => {
                        //if there is an error saving... response with an error message
                        if(repairOrderSaveError) return res.status(409).json({message: "Something went wrong saving the RO"})
                        //else response that it was saved successfully
                        return res.json({message:'RO saved successfully'})
                    })
                })
            } else {
                //else if the vehicle is found save the repair order
                repairOrder.save((repairOrderSaveError) => {
                    // if there is an error saving, respond with an error message
                    if(repairOrderSaveError) return res.status(409).json({message: "Something went wrong saving the RO"})
                    //else respond with a success message
                    return res.json({message: "RO saved successfully"})

                })
            }
        })
    })
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