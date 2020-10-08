const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const eventSchema = new mongoose.Schema({
    user_id : {
        type: ObjectId,
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