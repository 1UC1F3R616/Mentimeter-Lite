const mongoose = require('mongoose')
const validator = require('validator')

const Question = require('./question')

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

// If event is deleted then delete it's questions also
eventSchema.pre('remove', async function (next) {
    const event = this

    await Question.deleteMany({ event_id: event._id })
    next()
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event