var socket = io()

// socket.on('countUpdated', (count) => {
//     console.log(`Clicked ${count}`)
// })

// socket.on('message1', (message) => {
//     console.log(`Message 1: ${message}`)
// })

// socket.emit('vote', {'option':'option1', 'votedBy':'voterID'})

myStorage = window.localStorage;

document.querySelector('#otpButton').addEventListener('click', () => {

    let otp = document.getElementById('otp').value;

    socket.emit('join', {'otp': otp})

    // socket.emit('messageAll', message)
})

socket.on('join_result', (json_data) => {
    status_code = json_data['status_code']
    if (status_code == '200') {
        console.log('OTP is valid')
        // adding otp in user storage with a count value, so to avoid multiple responses atleast somewhat

        if (myStorage.getItem('voter_otp') && myStorage.getItem('voter_otp').split(' ')[0] == json_data['otp']) {
            myStorage.setItem('voter_otp', `${json_data['otp']} 2`)
        }
        else {
            myStorage.setItem('voter_otp', `${json_data['otp']} 1`)
        }

        window.location.href='http://localhost:3000/vote.html'
    }
    else {
        console.log(`Fail ${status_code}`)
    }
})
