const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const optionSchema = new mongoose.Schema({
    question_id: { 
        type: mongoose.ObjectId,
        required: true 
    },
    statement : {
        type: String,
        required: true
    },
    number : {
        type : String,
        required : true
    }
}, {
    timestamps : true
});
