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
        type : Integer,
        required : true
    }
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question