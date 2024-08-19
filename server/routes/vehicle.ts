const express = require("express")
const router = express.Router()
import { getVehicle } from "../controllers/vehicle-controller"

router.route("/api/vehicle/:vin")
    .get(getVehicle)

export { router as vehicleRoute }