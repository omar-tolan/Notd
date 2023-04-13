const mongoose = require('mongoose')
const express = require('express')
const auth = require("../middleware/authentication")
const Task = require('../models/tasks')

const router = express.Router()

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/tasks", auth, async (req, res) => {
    try{
        
    }catch(e){
        res.status(500).send(e)
    }
})

