const logger =  require("./logger.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = async (req, res, next) => {
  const header = req.get("authorization")
  if (header && header.startsWith('Bearer ')){
    const token = header.replace("Bearer ", "")
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      res.status(401).json({ error: "token invalid" })
    } else {
      req.user = decodedToken.id.toString()
    }
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}