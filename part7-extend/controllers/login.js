const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user.js')
const loginRouter = require('express').Router()
require('dotenv').config()

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    return res.status(401).json({ error: 'Incorrect username or password.' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter