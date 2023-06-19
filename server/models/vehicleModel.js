const mongoose = require("mongoose")
const axios = require("axios")
const { transformVehicleData } = require("./utils")

const VehicleSchema = new mongoose.Schema({
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: String, required: true },
    EngineSize: { type: String, required: true },
    VIN: { type: String, required: true, uppercase: true }
})

const Vehicles = mongoose.model("vehicles",VehicleSchema)

async function getVehicleData(vin, callback){
    try{
        let res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
        let vehicleInfo = transformVehicleData(res.data.Results)
        vehicleInfo.VIN = vin
        callback(null, vehicleInfo)
    }
    catch(e){
        console.log(e)
        callback(e)
    }
}

exports.createVehicle = (vin, done) => {
    getVehicleData(vin, (err, vehicleInfo) => {
        if(err) return done(err)
        if(vehicleInfo === "Incorrect Vin") return done(vehicleInfo)
        let vehicle = new Vehicles(vehicleInfo)
        vehicle.save(error => {
            if(error) return done(error)
            return done(null, vehicle)
            
        })
    })
}

exports.getVehicle = (vin, done) => {
    Vehicles.find({VIN: vin}, (err, vehicle) => {
        if(err) return done(err)
        if(!vehicle) return done(null, false)
        return done(null, vehicle)
    })
}