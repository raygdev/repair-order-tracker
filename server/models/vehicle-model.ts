const mongoose = require("mongoose")
const axios = require("axios")
const { transformVehicleData } = require("./utils")

const VehicleSchema = new mongoose.Schema({
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: String, required: true },
    EngineSize: { type: String, required: true },
    VIN: { type: String, required: true, uppercase: true, unique: true }
}, {toJSON: { virtuals: true }, toObject: { virtuals: true}})

const Vehicles = mongoose.model("vehicles",VehicleSchema, 'vehicles')

async function getVehicleData(vin: string, callback: (err: string | null | unknown, vehicleInfo?:any) => void){
    try{
        let res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
        let vehicleInfo = transformVehicleData(res.data.Results)
        if(typeof vehicleInfo === "string"){
            callback(vehicleInfo)
        } else {
            callback(null, vehicleInfo)
        }
    }
    catch(e){
        console.log(e)
        callback(e)
    }
}

async function getVehicleInfo (vin: string) {
    let res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
    let vehicleInfo = transformVehicleData(res.data.Results)
    vehicleInfo.VIN = vin
    return vehicleInfo
}

export const createVehicle = (vin: string, done: any) => {
    getVehicleData(vin, (err, vehicleInfo) => {
        if(err) return done(err)
        vehicleInfo.VIN = vin
        let vehicle = new Vehicles(vehicleInfo)
        vehicle.save((error: any) => {
            if(error) return done(error)
            return done(null, vehicle)
            
        })
    })
}

export const getAndCreateVehicleInfo = async function (vin: string) {
    try {
        const vehicleInfo = await getVehicleInfo(vin)
        if(vehicleInfo === 'string') {
            return null
        }
        const insertedVehicle = new Vehicles(vehicleInfo)
        await insertedVehicle.save()
        return insertedVehicle
    } catch (e) {
        throw e
    }
}

export const getVehicle = (vin: string, done: any) => {
    Vehicles.findOne({VIN: vin}, (err: any, vehicle: any) => {
        if(err) return done(err)
        if(!vehicle) return done(null, false)
        return done(null, vehicle)
    })
}

export const findVehicleByVin = async function (vin: string) {
    try {
        const foundVehicle = Vehicles.findOne({ VIN: vin }).exec()
        if(!foundVehicle) {
            return null
        }
        return foundVehicle
    } catch (e) {
        console.log(e)
        throw e
    }
}