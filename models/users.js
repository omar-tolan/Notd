const mongoose = require("mongoose")
const Task = require('./tasks')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
            if(input.toLowerCase().includes("password")){
                throw new Error("Password cannot contain the word password!")
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.generateAuth = async function() {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_STRING)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.pre("save", async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next
})

userSchema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Invalid Credentials!")
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        throw new Error("Invalid Credentials!")
    }
    return user
}

userSchema.virtual('Tasks', {
    ref: 'Task',
    foreignField: 'owner',
    localField: '_id'
})

const User = mongoose.model("User", userSchema)

module.exports = User