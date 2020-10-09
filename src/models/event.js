const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const eventSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps : true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event