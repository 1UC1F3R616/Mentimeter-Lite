const app = require('./app')

const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')
const Event = require("./models/event");
const Option = require("./models/option");
const date = require("date-and-time");

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


const server = http.createServer(app)
const io = socketio(server)

// var count = 0
// Server Side code for Socket.io // Client code can be present in different files but socket code for server 
// has to be here only!
// So a vote with option and socket id from vote.js will be coming here, that is forwarded to user.js and animated 
// over there. Here vote is also added in the backend for pdf export.
// Initially user or voter is not presented with sockets page but redirected to it.
io.on('connection', (socket)=>{
    console.log('New User has appeared!')

    // socket.emit('message1', 'Hey their!')
    // socket.emit('countUpdated', count);
    // count += 1

    // socket.on('messageAll', (message) => {
    //     console.log(message)
    //     io.emit('message1', message);
    // })

    // First voter send an otp, if event is active then relace the html inside to allow them to vote and then replace html again with message
    // Thankyou and place the otp they voted in their local storage so to prevent the multiple inputs

    socket.on('join', async (json_data) => {
        
        const events = await Event.findOne({'otp': json_data['otp']})

        console.log(events)

        let CurrentDT = new Date();

        if (events == null) {
            socket.emit('join_result', {'status_code': '403'})
        }
        
        else if (CurrentDT > events['valid_upto_date']) {
            console.log('Expired')
            socket.emit('join_result', {'status_code': '400'})
        }
        else {
            socket.emit('join_result', {'status_code': '200', 'otp': json_data['otp']})
        }


        // io.emit('join_result', 'sd')
    })

    socket.on('vote', async (json_data) => {
        try {
            option_ = await Option.findOne({_id: json_data['option_id']})
            vote = option_.votes + 1
            await Option.updateOne({_id: json_data['option_id']}, {votes: vote })
            console.log('Yes got an option with this id for voting')
        } catch(e) {
            console.log({'err': e.message})
        }

        console.log(json_data)

        io.emit('vote_result', json_data)
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