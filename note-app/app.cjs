const express = require("express")
const cors = require("cors")
const config = require("./utils/config.cjs")
require("express-async-errors")
const notesRouter = require("./controllers/notes.cjs")
const usersRouter = require("./controllers/users.cjs")
const loginRouter = require("./controllers/login.cjs")
const mongoose = require("mongoose")
const middleware = require("./utils/middleware.cjs")
require('dotenv').config()


const app = express();

const url = config.MONGODB_URL;

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    });

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.static("dist"));
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing.cjs')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;