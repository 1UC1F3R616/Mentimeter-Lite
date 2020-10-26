var socket = io()

socket.on('countUpdated', (count) => {
    console.log(`Clicked ${count}`)
})

socket.on('message1', (message) => {
    console.log(`Message 1: ${message}`)
})

socket.emit('vote', {'option':'option1', 'votedBy':'voterID'})

const work = document.getElementById('work')

document.querySelector('#messageAll').addEventListener('submit', (e) => {

    e.preventDefault()
    
    const message = document.querySelector('input').value

    socket.emit('messageAll', message)
})