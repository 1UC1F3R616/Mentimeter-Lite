// event_id and question_number must be a compound key else many questions
// can be created with the same question number

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const questionSchema = new mongoose.Schema({
    event_id : {
        type: mongoose.ObjectId,
        required: true
    },
    statement : {
        type : String,
        required: true
    },
    number : {
        type : Number,
        required : true
    }
}, {
    timestamps : true
})

// composite key
questionSchema.index({'event_id': 1, 'number': 1}, {unique: true});

const Question = mongoose.model('Question', questionSchema)
module.exports = Question