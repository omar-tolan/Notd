const jwt = require("jsonwebtoken")
const { findOne } = require("../models/users")
const User = require("../models/users")

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const data = jwt.verify(token, process.env.JWT_STRING)
        const user = await findOne({_id: data._id, 'tokens.token': token})
        if(!user){
            throw new Error({error: "Please Authenticate!"})
        }
        req.user = user
        next()
    }catch(e){
        res.status(401).send(e)
    }
}

module.exports = auth