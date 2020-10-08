const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
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


adminSchema.methods.generateAuthToken = async function() {
    const admin = this
    console.log('From admin model generateAuthToken')
  
    const token = jwt.sign({ _id:admin._id.toString() }, 'secret', { expiresIn: "1 week" })
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return admin
}


adminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

// controlling the data that we are returning
adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens
    
    return adminObject
}

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin