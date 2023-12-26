const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user.js')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (password.length < 3) {
    res.status(400).json({ error: 'password should have minimum length 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const newUser = await user.save()

  res.status(201).json(newUser)
})

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

module.exports = usersRouter