const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../model/blog.js')
const helper = require('./test_helper.js')
const User = require('../model/user.js')

import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

const api = supertest(app)

const createUserAndLogin = async () => {
  await api
    .post('/api/users')
    .send({
      username: 'annie',
      password: 'annie',
      name: 'Annie'
    })

  const user = await api
    .post('/api/login')
    .send({
      username: 'annie',
      password: 'annie'
    })
  return user
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('create a new user', () => {
  test('a new user is created with unique name', async () => {
    const response = await api
      .post('/api/users')
      .send({
        username: 'annie',
        password: 'annie',
        name: 'Annie'
      })
      .expect(201)

    const usersAtEnd = await User.find({})
    const names = usersAtEnd.map(user => user.name)
    expect(names).toContain('Annie')
  })

  test('fail to create new user if duplicate username', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'annie',
        password: 'annie',
        name: 'Annie'
      })

    const response = await api
      .post('/api/users')
      .send({
        username: 'annie',
        password: 'annie',
        name: 'Anniehehe'
      })
      .expect(400)

    const usersAtEnd = await User.find({})
    const names = usersAtEnd.map(user => user.name)
    expect(names).not.toContain('Anniehehe')
  })
})

describe('user login', () => {
  test('login after creating a user', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'annie',
        password: 'annie',
        name: 'Annie'
      })

    const response = await api
      .post('/api/login')
      .send({
        username: 'annie',
        password: 'annie'
      })

    expect(response.body.token).toBeDefined()
  })
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.blogs.length)

  }, 100000)

  test('blogs are uniquely identified with id, not the default _id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('success with valid data', async () => {
    const user = await createUserAndLogin()

    const blogToSave = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    const content = blogsAtEnd.map(blog => blog.title)
    expect(blogsAtEnd.length).toBe(helper.blogs.length + 1)
    expect(content).toContain('Go To Statement Considered Harmful')

  })

  test('success with default value for missing property', async () => {
    const user = await createUserAndLogin()

    const blogToSave = {
      title: 'Hehe',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const insertedBlog = await Blog.find({ title:'Hehe' })
    console.log(insertedBlog[0])
    expect(insertedBlog[0].likes).toBe(0)

  })

  test('fails with status code 400 if data invalid', async () => {
    const user = await createUserAndLogin()

    const blogToSave = {
      title: 'Hehe',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(blogToSave)
      .expect(400)
  })

  test('fails with status code 401 if no token', async () => {
    const blogToSave = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToSave)
      .expect(401)
  })

})

describe('deletion of a blog', () => {
  test.skip('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test.skip('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = '019283'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

  })
})

describe('update a blog', () => {
  test.skip('update a property of a blog successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, 'likes': 17 })
      .expect(200)

    const updatedBlog = await Blog.find({ _id : blogsAtStart[0].id })
    expect(updatedBlog[0].toJSON().likes).toBe(17)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})