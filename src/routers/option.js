const express = require('express')

const Option = require('../models/option')

const authUser = require('../middleware/authUser')

app = express()
app.use(express.json())

router = new express.Router()

router.get('/option', (req, res) => {
    res.json({message: "MCQ uhh!"})
})


// create option: post
router.post('/create/option', authUser, async (req, res) => {
    try {
        const option = new Option({ question_id:req.body.question_id, statement: req.body.statement, number: req.body.number })
        await option.save()

        res.status(201).json(option)
    }
    catch(e) {
        res.status(400).json({ err: e.message })
    }
})

////////////////////////export///////////////////////
module.exports = router