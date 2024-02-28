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
        searchOptions = {
            owner: req.user._id
        }
        if(req.query.completed){
            searchOptions.completed = req.query.completed === "true"
        }
        const sortOptions = {
            createdAt: 1
        }
        if(req.query.sort){
            const sortQuery = req.query.sort.split(":")
            sortOptions[sortQuery[0]] = sortQuery[1] === "asc"? 1 : -1
        }
        const tasks = await Task.find(searchOptions).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip)).sort(sortOptions)
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router