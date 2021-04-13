const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
})
    .then(() => {
        console.log('DB connected.')
    })
    .catch((err) => console.log(err.message))

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB.')
    })

    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected.')
    })

    process.on('SIGINT', async () => { //fired when CTRL-C on server is used.
        await mongoose.connection.close()
        process.exit(0)//exits the connection.
    })

    module.exports = {mongoose}