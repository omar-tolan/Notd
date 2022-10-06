const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate(input) {
            if(!validator.isEmail(input)){
                throw new Error("Invalid Email!")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6,
        validate(input) {
            if(input.lowercase().contains("password")){
                throw new Error("Password cannot contain the word password!")
            }
        }
    }
})

userSchema.virtual('Tasks', {
    ref: 'Task',
    foreignField: 'owner',
    localField: '_id'
})

const User = mongoose.model("User", userSchema)

module.exports = User