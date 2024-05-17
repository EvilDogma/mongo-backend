const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)

const connection = mongoose.connection
const client = mongoose.connection.getClient()

module.exports = { connection, client }