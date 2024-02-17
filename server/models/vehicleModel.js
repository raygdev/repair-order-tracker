const mongoose = require("mongoose")
const axios = require("axios")
const { transformVehicleData } = require("./utils")

const VehicleSchema = new mongoose.Schema({
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: String, required: true },
    EngineSize: { type: String, required: true },
    VIN: { type: String, required: true, uppercase: true, unique: true }
})

const Vehicles = mongoose.model("vehicles",VehicleSchema)

async function getVehicleData(vin, callback){
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

async function getVehicleInfo (vin) {
    try {
        let res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
        let vehicleInfo = transformVehicleData(res.data.Results)
        return vehicleInfo
    } catch (e) {
        console.log('error from [getVehicleInfo]',e)
        throw e
    }
}

exports.createVehicle = (vin, done) => {
    getVehicleData(vin, (err, vehicleInfo) => {
        if(err) return done(err)
        vehicleInfo.VIN = vin
        let vehicle = new Vehicles(vehicleInfo)
        vehicle.save(error => {
            if(error) return done(error)
            return done(null, vehicle)
            
        })
    })
}

exports.getVehicle = (vin, done) => {
    Vehicles.findOne({VIN: vin}, (err, vehicle) => {
        if(err) return done(err)
        if(!vehicle) return done(null, false)
        return done(null, vehicle)
    })
}