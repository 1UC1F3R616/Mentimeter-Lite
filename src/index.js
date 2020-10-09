const app = require('./app')

const port = process.env.PORT || 3000

app.get('', (req, res) => {
    console.log(req.ip)
    res.status(403).json({message: "You ain't hacker!"})
})

// Running Server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})