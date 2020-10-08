const express = require('express')
const Admin = require('../models/admin')
const authAdmin = require('../middleware/authAdmin')

app = express()
app.use(express.json()) // for parsing application/json

router = new express.Router()

router.get('/admin', (req, res) => {
    res.json({message: 'Feeling like a hacker?'})
})

// signup route for admin
router.post('/signup/admin', async (req, res) => {
    try {
        const admin = new Admin(req.body)
        await admin.save()

        token = await admin.generateAuthToken()

        res.status(201).json({ admin, token })
    }
    catch (err) {
        res.status(400).json({err})
    }
})

// signin/login route for admin
router.post('/signin/admin', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)

        token = await admin.generateAuthToken()

        res.status(200).json({ admin, token })
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})






////////////////////////export///////////////////////
module.exports = router