const loginRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')

loginRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = loginRouter