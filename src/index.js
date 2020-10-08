const express = require('express')
require('./db/mongoose')

app = express()

// Import Routes
const adminRouter = require('./routers/admin')
const userRouter = require('./routers/user')
const eventRouter = require('./routers/event')
const questionRouter = require('./routers/question')
const optionRouter = require('./routers/option')

// Registering Routes
app.use(adminRouter)
app.use(userRouter)
app.use(eventRouter)
app.use(questionRouter)
app.use(optionRouter)

// Running Server

app.get('', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "You ain't hacker!"})
})

app.listen(3000, () => {
    console.log('Server is up and running!')
})