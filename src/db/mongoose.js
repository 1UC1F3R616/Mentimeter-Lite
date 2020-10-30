const mongoose = require('mongoose')

const MONGODB_URL = 'mongodb://localhost:27017/mentimeter-lite' // process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})