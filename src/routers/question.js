const express = require('express')

const Question = require('../models/question')

const authUser = require('../middleware/authUser')

app = express()
app.use(express.json())

router = new express.Router()

router.get('/question', (req, res) => {
    res.json({message: "Question Amigo!"})
})

// create question: post
router.post('/create/question', authUser, async (req, res) => {
    try {
        const question = new Question({event_id:req.body.event_id, statement:req.body.statement, number:req.body.number})
        await question.save()

        res.status(201).json(question)
    }
    catch(e) {
        res.status(400).json({err: e.message})
    }
})


////////////////////////export///////////////////////
module.exports = router