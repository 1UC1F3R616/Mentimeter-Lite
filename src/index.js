const app = require('./app')

const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

// Socket Check
io.on('connection', ()=>{
    console.log('New Connection!')
})


////////////////////////////////////////////////////////Server Configuration//////////////////////////////////////

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "You ain't hacker!"})
})

// Running Server
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})