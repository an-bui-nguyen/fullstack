const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const config = require('./utils/config.js')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const testingRouter = require('./controllers/testing.js')

const app = express()

const url = config.MONGODB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  logger.info('Connected to MongoDB')
})

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)
app.use(morgan('dev'))

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app