const express = require('express')
const app = express()
const PORT = process.env.PORT||3333
require('dotenv').config()

var session = require('express-session')
const MongoStore = require('connect-mongo')

const db = require('./config/client')
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({client: db.client})
    // cookie: { secure: true }
  }))

const viewroutes = require('./routes/view-routes')
const authroutes = require('./routes/auth-routes')

app.use('/',[viewroutes])

app.use('/api/auth',[authroutes])

db.connection.once('open', ()=>{
    console.log('DB Connected')
    app.listen(PORT, ()=> console.log('server started on port: ', PORT))
})

