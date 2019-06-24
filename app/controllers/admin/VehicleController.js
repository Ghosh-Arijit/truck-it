const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Vehicle } = require("../../models/Vechile")

const { userAuth }= require("../../middlewares/auth")
const { adminAccess } = require("../../middlewares/access")

//multer
const multer= require("multer")
const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads")
    },
    filename: function(req,file,cb){ 
        cb(null, Number(new Date()) + '_' + file.originalname)
    }
})

const fileFilter =(req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true)
    }else{
        return cb(new Error('Only image is allowed'))
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter
})

//localhost:3005/admin/vehicles
router.get("/", userAuth, adminAccess, (req,res) => {
    Vehicle.find()
        .then(vehicles => {
            res.send(vehicles)
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/admin/vehicles/:id
router.get("/:id", userAuth, adminAccess, (req,res) => {
    const id = req.params.id
    Vehicle.findOne({_id: id})
        .then(vehicle => {
            res.send(vehicle)
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/admin/vehicles
router.post("/", userAuth, adminAccess, upload.single("image"), (req,res) => {
    const { name, capacity, _length, _breadth, _height, image} = req.body
    const body = {
        name,
        capacity,
        //price,
        image: req.file ? req.file.location || req.file.filename : image,
        dimension: {
            _length, _breadth, _height
        }
    }
    const vehicle = new Vehicle(body)
    vehicle.save()
        .then(vehicle => {
            res.send({success: vehicle})
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/admin/vehicles/:id
router.put("/:id", userAuth, adminAccess, upload.single("image"), (req,res) => {
    const id = req.params.id
    const { name, capacity, _length, _breadth, _height, image, price } = req.body
    const body = {
        name,
        capacity,
        price,
        image: req.file ? req.file.location || req.file.filename : image,
        dimension: {
            _length, _breadth, _height
        }
    }
    Vehicle.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'})
        .then(vehicle => {
            res.send({success: vehicle})
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/admin/vehicles/:id
router.delete("/:id", userAuth, adminAccess, (req,res) => {
    const id = req.params.id
    Vehicle.findByIdAndDelete(id)
        .then(vehicle => {
            res.send({success: "successfully deleted"})
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    adminVehicleRouter: router
}