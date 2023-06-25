const express = require("express")
const router = express.Router()
const vehicleController = require("../controllers/vehicleController")

router.route("/api/vehicle/:vin")
    .get(vehicleController.getVehicle)

module.exports = router