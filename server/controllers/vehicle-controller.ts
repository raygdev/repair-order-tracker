import { Request, Response } from 'express'
import { getVehicle as getVehicleInfo } from "../models/vehicle-model"

export const getVehicle = function(req: Request, res: Response) {
    let vin = req.params.vin
    getVehicleInfo(vin, (err: any, vehicle: any) => {
        if(err) return res.status(500).json({ message: "Something went wrong finding the vehicle" })
        if(!vehicle) return res.status(404).json({ message: "This vehicle doesn't exist" })
        res.status(200).json({ vehicle })
    })
}