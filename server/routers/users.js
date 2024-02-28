const express = require("express")
const multer = require("multer")
const sharp = require("sharp")
const User = require('../models/users.js')
const auth = require("../middleware/authentication")
const router = express.Router()

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, callback){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return callback(new Error("Please upload a picture"))
        }
        callback(undefined, true)
    }
})

router.post("/users", async (req, res) => {
    try{
        const user = new User(req.body)
        const token = await user.generateAuth()
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, set this on production
            sameSite: 'strict'
        })
        await user.save()
        res.status(201).send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/user/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    req.user.avatar = await sharp(req.file.buffer).png().resize({
        width: 250,
        height: 250
    }).toBuffer()
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error : error.message})
})

router.delete("user/me/avatar", auth, async (req, res) => {
    try{
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("user/me/avatar", auth, async (req, res) => {
    try{
        res.set("Content-Type", "image/png")
        res.status(200).send(req.user.avatar)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/user/me", auth, async (req, res) => {
    res.send(req.user)
})

router.post("/users/login", async (req, res) => {
    try{
        const user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateAuth()
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, set this on production
            sameSite: 'strict'
        })
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