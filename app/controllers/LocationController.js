const express = require("express")
const _ = require("lodash")
const router = express.Router()
const axios = require('axios')

const { placeApiKey } = require("../../config/api_keys")

//localhost:3005/location/place/:name
router.get("/place/:name", (req,res) => {
    const { name } = req.params
    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&key=${placeApiKey}`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    locationRouter: router
}