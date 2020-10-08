const express = require('express')

const Event = require('../models/event')

const authUser = require('../middleware/authUser')

app = express()
app.use(express.json())

router = new express.Router()

router.get('/event', (req, res) => {
    res.json({message: "Event Amigo!"})
})

// create event: post
router.post('/create/event', authUser, async (req, res) => {
    // console.log(req.body)
    // res.send("authorized")
    try {
        const event = new Event({user_id:req.user._id, name:req.body.name, description:req.body.description})
        await event.save()

        res.status(201).json(event)
    }
    catch(e) {
        res.status(400).json({err: e.message})
    }
})

// fetch past events: get
router.get('/events', authUser, async (req, res) => {
    try {
        const events = await Event.find({ user_id : req.user._id})
        res.status(200).json(events)
    }
    catch (e) {
        res.status(400).json({err: e.message})
    }
})

// fetch this event: get
router.get('/events/:id', authUser, async (req, res) => {
    try {
        const event = await Event.find({ user_id : req.user._id, _id : req.params.id})
        res.status(200).json(event)
    }
    catch (e) {
        res.status(400).json({err: e.message})
    }
})

////////////////////////export///////////////////////
module.exports = router