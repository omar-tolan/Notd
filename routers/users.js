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
        const user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateAuth()
        res.status(200).send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch("/users", auth, async (req, res) => {
    try{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['email', 'name', 'password']
        const validUpdate = updates.every((update) => allowedUpdates.includes(update)) 
        if(!validUpdate){
            res.status(400).send("Invalid Update!")
        }
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save() 
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try{
        debugger
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try{
        debugger
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router