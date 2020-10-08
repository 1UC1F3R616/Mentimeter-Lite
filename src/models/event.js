const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const eventSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.ObjectId,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event