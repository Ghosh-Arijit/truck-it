const express = require("express")
const router = express.Router()


//admin
const { vendorAdminRouter }= require('../app/controllers/admin/VendorController')
const { adminVehicleRouter } = require('../app/controllers/admin/VehicleController')
router.use("/admin/vehicles", adminVehicleRouter)
router.use("/admin/vendor", vendorAdminRouter )

//user
const { userRouter } = require('../app/controllers/UserController')
const { vehicleRouter }= require('../app/controllers/VehicleController')
router.use("/", userRouter)
router.use("/vehicles", vehicleRouter)

//vendor
const { vendorRouter } = require('../app/controllers/vendor/VendorController')
const { vendorVehicleRouter } = require('../app/controllers/vendor/VehicleController')
router.use("/vendor", vendorRouter)
router.use("/vendor/vehicles", vendorVehicleRouter)


//Location
const { locationRouter } = require('../app/controllers/LocationController')
router.use("/location", locationRouter)

module.exports = {
    routes: router
}