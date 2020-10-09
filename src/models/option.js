// question_id and option_number must be a compound key else many options
// can be created with the same option number

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const optionSchema = new mongoose.Schema({
    question_id: { 
        type: mongoose.ObjectId,
        required: true,
        ref: 'Question'
    },
    statement : {
        type: String,
        required: true
    },
    number : {
        type : Number,
        required : true
    }
}, {
    timestamps : true
});

// composite key
// This behaves wierd enough :'(
optionSchema.index({'question_id': 1, 'number': 1}, {unique: true});

const Option = mongoose.model('Option', optionSchema)
module.exports = Option