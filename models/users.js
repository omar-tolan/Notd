const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6
    }
})

userSchema.virtual({
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model("User", userSchema)

module.exports = User