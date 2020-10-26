// Here Results will be shown to the user

var socket = io()

socket.on('result', (data) => {
    console.log(data)
})