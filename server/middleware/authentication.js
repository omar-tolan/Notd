const jwt = require("jsonwebtoken")
const User = require("../models/users")

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.token
        const data = jwt.verify(token, process.env.JWT_STRING)
        const user = await User.findOne({_id: data._id, 'tokens.token': token})
        if(!user){
            throw new Error({error: "Please Authenticate!"})
        }
        req.user = user
        req.token = token
        next()
    }catch(e){
        res.status(401).send(e)
    }
}

module.exports = auth