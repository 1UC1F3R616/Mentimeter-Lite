// event_id and question_number must be a compound key else many questions
// can be created with the same question number

const mongoose = require('mongoose')

const Option = require('./option')

const questionSchema = new mongoose.Schema({
    event_id : {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Event'
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

// If question is deleted then delete it's options also
questionSchema.pre('remove', async function (next) {
    const question = this

    await Option.deleteMany({ question_id: question._id })
    next()
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question