const express = require('express')
const User = require('../models/user')

app = express()
app.use(express.json())

router = new express.Router()

router.get('/user', (req, res) => {
    res.json({message: "Hola!"})
})

// signup route for user: post
router.post('/signup/user', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        token = await user.generateAuthToken()

        res.status(201).json({ user, token })
    }
    catch (err) {
        res.status(400).json({err})
    }
})

// signin/login route for user: post
router.post('/signin/user', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        token = await user.generateAuthToken()

        res.status(200).json({ user, token })
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

// user profile: get


////////////////////////export///////////////////////
module.exports = router