const express = require("express")
const User = require('../models/users.js')
const router = new express.Router()

router.post("/users",async (req, res) => {
    try{
        const user = req.body 
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router