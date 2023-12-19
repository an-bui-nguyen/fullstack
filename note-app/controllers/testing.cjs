const testingRouter = require('express').Router()
const Note = require('../models/note.cjs')
const User = require('../models/user.cjs')

testingRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = testingRouter