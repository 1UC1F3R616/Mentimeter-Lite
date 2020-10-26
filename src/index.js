const app = require('./app')

const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


const server = http.createServer(app)
const io = socketio(server)

var count = 0
// Server Side code for Socket.io // Client code can be present in different files but socket code for server 
// has to be here only!
// So a vote with option and socket id from vote.js will be coming here, that is forwarded to user.js and animated 
// over there. Here vote is also added in the backend for pdf export.
// Initially user or voter is not presented with sockets page but redirected to it.
io.on('connection', (socket)=>{
    console.log('New Connection!')

    socket.emit('message1', 'Hey their!')
    socket.emit('countUpdated', count);
    count += 1

    socket.on('messageAll', (message) => {
        console.log(message)
        io.emit('message1', message);
    })

    socket.on('vote', (json_data) => {
        io.emit('result', json_data)
    })
})


////////////////////////////////////////////////////////Server Configuration//////////////////////////////////////

const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public') // index.html is served from here overriding the api calls
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // now index.html will override address | visit this index.html manually or from here, both are same thing

app.get('', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "If you are seeing this, their's probably something wrong"})
})

app.get('/hack', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "You ain't hacker!"})
})

app.get('*', (req, res) => {
    res.render('404')
})

// Running Server
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})