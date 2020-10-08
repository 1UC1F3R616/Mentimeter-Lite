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

////////////////////////export///////////////////////
module.exports = router