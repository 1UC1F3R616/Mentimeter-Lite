const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Event = require('./event')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
            if (!validator.isAscii(value))
                throw new Error('Only ascii characters are allowed')
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase() === 'password' || value.toLowerCase() === '123456') {
                throw new Error('This password is not allowed')
            }
        }
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    is_ua_accepted: {
        type: Boolean,
        default: false
    },
    is_banned: {
        type: Boolean,
        default: false
    },
    tokens: [
        {
            token : {
                type: String,
                trim: true,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function() {
    const user = this
    console.log('From user model generateAuthToken')
  
    const token = jwt.sign({ _id:user._id.toString() }, 'secret', { expiresIn: "1 week" })
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// If user is deleted then delete it's Events also
userSchema.pre('remove', async function (next) {
    const user = this

    await Event.deleteMany({ user_id: user._id })
    next()
})

// controlling the data that we are returning
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

const User = mongoose.model('User', userSchema)
module.exports = User