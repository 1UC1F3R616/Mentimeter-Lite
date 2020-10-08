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



////////////////////////export///////////////////////
module.exports = router