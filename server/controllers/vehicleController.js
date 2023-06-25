const vehicleModel = require("../models/vehicleModel")

exports.getVehicle = function(req, res) {
    let vin = req.params.vin
    vehicleModel.getVehicle(vin, (err, vehicle) => {
        if(err) return res.status(500).json({ message: "Something went wrong finding the vehicle" })
        if(!vehicle) return res.status(404).json({ message: "This vehicle doesn't exist" })
        res.status(200).json({ vehicle })
    })
}