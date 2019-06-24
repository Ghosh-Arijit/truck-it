const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../models/User")

const { userAuth } = require("../middlewares/auth")

//localhost:3005/register
router.post("/register",function(req,res){
    const body= _.pick(req.body,["name","mobile","email","role","password"]) 
    body.passUpdate = true
    const availableRoles = ['customer', 'vendor']
    !availableRoles.includes(body.role) && delete body.role
        const user= new User(body)
        user.save()
            .then((user)=> {
                res.send(user)
            })
    
            .catch((err)=> {
                res.send(err)
            })   
})

//localhost:3005/login
router.post("/login",function(req,res){
    const body= _.pick(req.body,["mobile_email","password"])
    User.findByCredentials(body.mobile_email,body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then((user)=> {
            res.send(user)
        })
        .catch((errors)=> {
            res.send({errors})
        })
})

//localhost:3005/logout
router.delete("/logout", userAuth, (req,res) => {
    const { user } = req
    User.findByIdAndUpdate(user._id,{ tokens: [] })
        .then(() => {
            res.send({success: "successfully logged out"})
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/token/:id
router.get("/token/:id", (req,res) => {
    const token = req.params.id
    User.findOne({"tokens.token": token})
        .then(user => {
            res.send({
                id: user._id, 
                name: user.name, 
                role: user.role, 
                token,
                mobile: user.mobile,
                email: user.email,
                allowAccess: user.allowAccess
            })
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/update_profile
router.put("/update_profile", userAuth, (req,res) => {
    const id = req.user._id
    const body = _.pick(req.body,["name","mobile","email","password"])
    if(body.password != null){
    body.password.length > 0 ? body.passUpdate = true : delete body.password
    }
    User.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'})
        .then(user => {
            return body.password ? user.updatePassword() : user
        })
        .then(user => {
            res.send({success: user})
        })
        .catch(err => {
            res.send(err)
        })
})



module.exports = {
    userRouter: router
}