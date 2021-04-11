const express = require('express')
const morgan = require ('morgan')
const createError = require('http-errors')
require('dotenv').config()
const AuthRoute = require)('./Routes/Auth.route')

const app = express()

app.get('/', async (req, res, next) => {
    res.send('X to the PRESS')
})

app.use('/auth', AuthRoute)

app.use(async (req, res, next) => {
    // const error = new Error('Not Found.') 
    // error.status = 404
    // next(error)
    next(createEorr.NotFound())//In the function, use quotes and it will show client whatever you write inside.
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`I'm on ${PORT}`)
})

