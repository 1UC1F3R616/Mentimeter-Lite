const express = require('express')
const cors = require('cors');
require('./db/mongoose')

app = express()
app.use(cors())


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


module.exports = app