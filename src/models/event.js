const mongoose = require('mongoose')
const date = require('date-and-time');

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
    },
    otp: {
        type: String,
        required: true
    },
    valid_upto_date: {
        type: Date,
        default: date.addMinutes(new Date(), 30)
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