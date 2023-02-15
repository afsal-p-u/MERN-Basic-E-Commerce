const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')

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
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter)


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("Backend server is running!")
})