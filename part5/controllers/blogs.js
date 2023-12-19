const Blog = require('../model/blog.js')
const express = require('express')
const User = require('../model/user.js')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  if (!req.user) {
    res.status(401).json({ error: 'Invalid token. Please log-in again.' })
  }
  const userId = req.user

  const user = await User.findById(userId)

  const newBlog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  }).populate('user')

  console.log(newBlog)

  try {
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  if (!req.user) {
    res.status(401).json({ error: 'Invalid token. Please log-in again.' })
  }

  const user = req.user

  try {
    const blogToDelete = await Blog.findById(id)
    console.log(blogToDelete)
    if (blogToDelete.user) {
      console.log(blogToDelete.user.id.toString())
      if (blogToDelete.user.toString() === user) {
        await Blog.findByIdAndDelete(id)
        res.status(204).end()
      } else {
        res.status(401).json({ error: 'Unauthorized to delete this blog. Must be blog creator.' })
      }
    } else {
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id

  const blog = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new : true }).populate('user')
  res.json(updatedBlog)
})

module.exports = blogsRouter