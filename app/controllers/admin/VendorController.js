const express= require("express")
const _=require("lodash")
const router= express.Router()

const { User }= require("../../models/User")
const { Vendor }= require("../../models/Vendor")

const { userAuth }= require("../../middlewares/auth")
const { adminAccess }= require("../../middlewares/access")

//localhost:3005/admin/vendor
router.get("/",userAuth,adminAccess,function(req,res){
    Vendor.find()
    .populate('user' , 'name mobile email')
        .then((vendors)=> {
            res.send(vendors)
        })
        .catch((err)=> {
            res.send(err)
        })
})

//localhost:3005/admin/vendor/:id
router.get("/:id",userAuth,adminAccess,function(req,res){
    const id= req.params.id
    Vendor.findOne({_id:id})
    .populate('user' , 'name mobile email')
        .then((vendor)=> {
            res.send(vendor)
        })
        .catch((err)=> {
            res.send(err)
        })

})

//localhost:3005/admin/vendor:id
router.put("/:id",userAuth,adminAccess,function(req,res){
    const id= req.params.id
    const body=  _.pick(req.body,["isVerified"])
    console.log("hi")
    Vendor.findOneAndUpdate({_id: id},body,{new:true,runValidators:true})
    .populate('user','name mobile email')
        .then((vendor)=> {
            res.send(vendor)
        })
        .catch((err)=> {
            res.send(err)
    })
})

//localhost:3005/admin/vendor:id
router.delete("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    Vendor.findByIdAndDelete(id)
        .then((vendor)=> {
            if(vendor){
                res.send({
                    vendor,
                    notice: "Successfully Deleted"
                })
            }else{
                res.status("404").send({
                    notice: "page not found"
                })
            }
        })
        .catch((err)=> {
            res.send(err)
        })
})


module.exports= {
    vendorAdminRouter: router
}

