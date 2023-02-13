const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')

// env cofiguration
require('dotenv').config()

// mongodb connection
mongoose.set('strictQuery', false)
const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(process.env.URL, params).then(() => {
    console.log("DB Connection successfull")
}).catch((err) => {
    console.log(err)
})

const app = express()

// for using json
app.use(express.json())

// routers
app.use('/api/user', authRouter)


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("Backend server is running!")
})