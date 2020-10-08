const express = require('express')
require('./db/mongoose')

app = express()

// Import Routes
const adminRouter = require('./routers/admin')

// Registering Routes
app.use(adminRouter)


// Running Server

app.get('', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "You ain't hacker!"})
})

app.listen(3000, () => {
    console.log('Server is up and running!')
})