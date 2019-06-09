const express= require("express")
const _= require("lodash")
const router= express.Router()

const { User }= require("../models/User")
const { Vendor }= require("../models/Vendor")

const { userAuth }= require("../middlewares/auth")
const { vendorAccess }= require("../middlewares/access")

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
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'application/pdf'){
        cb(null,true)
    }else{
        return cb(new Error('Only image or pdf is allowed'))
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter
})

//localhost:3005/vendor/register
router.post("/register", (req,res) => {
    const body = _.pick(req.body,["user"])
    const vendor = new Vendor(body)
    vendor.save()
        .then(vendor => {
            res.send(vendor)
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3000/vendor
router.get("/",userAuth,vendorAccess,function(req,res){
    Vendor.findOne({user: req.user._id})
        .then(vendor => {
            res.send({success: vendor})
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3000/vendor
router.post("/",userAuth,vendorAccess,upload.single('document'),function(req,res){
    const body= _.pick(req.body,["address","name","account_number","IFSC_code","branch","paytm","document"])
    body.user= req.user._id
    if(req.file){
        body.document = req.file.filename
    }
    const {name,account_number,IFSC_code,branch,paytm} = body
    body.payment = {
        bank_account: {name,account_number,IFSC_code,branch},
        paytm: paytm
    }
    const vendor= new Vendor(body)
    vendor.save()

        .then((vendor)=> {
            res.send({
                vendor,
                notice: "Successfully inserted your information"

            })
        })
        .catch((err)=> {
            res.send({
                err,
                notice: "Failed to enter your information"
            })
        })
})

//localhost:3000/vendor
router.put("/",userAuth,vendorAccess,upload.single('document'),function(req,res){
    //const id= req.params.id
    const { address, pincode, bank_account_number, bank_account_ifsc} = req.body
    //const body= _.pick(req.body,["address","pincode","bank_account_number","bank_account_ifsc","pan","document"])
    const id= req.user._id
    // if(req.file){
    //     body.document = req.file.filename
    // }
    // body.payment = {
    //     bank_account: {
    //         number: bank_account_number,
    //         ifsc: bank_account_ifsc
    //     }
    // }
    // body.address = {
    //         full: address,
    //         pincode
    // }

    const body = {
        address: {
            full: address,
            pincode
        },
        payment: {
            bank_account: {
                number: bank_account_number,
                IFSC_code: bank_account_ifsc
            }
        },
        //document:  req.files['aadhar'] ? req.files['aadhar'][0].location || req.files['aadhar'][0].filename : aadhar
    }

    Vendor.findOneAndUpdate({user:id},body,{new:true,runValidators:true})
        .then((vendor)=> {
            res.send({success: vendor})
        })
        .catch((err)=> {
            res.send(err)
        })
})

module.exports= {
    vendorRouter: router
}
