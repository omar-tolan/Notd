const express = require("express")
const User = require('../models/users.js')
const auth = require("../middleware/authentication")
const router = express.Router()

router.post("/users", async (req, res) => {
    try{
        const user = new User(req.body)
        const token = await user.generateAuth()
        await user.save()
        res.status(201).send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/user/me", auth, async (req, res) => {
    res.send(req.user)
})

router.post("/users/login", async (req, res) => {
    try{
        debugger
        const user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateAuth()
        res.status(200).send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch("/users/:id", async (req, res) => {
    try{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['email', 'name', 'password']
        const validUpdate = updates.every((update) => allowedUpdates.includes(update)) 
        if(!validUpdate){
            res.status(400).send("Invalid Update!")
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!user){
            res.status(404).send()
        }
        await user.save() 
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router