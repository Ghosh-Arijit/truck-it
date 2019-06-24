const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Vehicle } = require("../models/Vechile")

//localhost:3005/vehicles
router.get("/", (req,res) => {
    Vehicle.find()
        .then(vehicles => {
            res.send(vehicles)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    vehicleRouter: router
}