const supertest = require("supertest");
const mongoose = require('mongoose')
const app = require("../app.cjs")
const Note = require("../models/note.cjs")
const helper = require("./test_helper.js")


beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Browser can execute only JavaScript'
  )
}, 100000)

test ('a valid note can be added', async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  
    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})



afterAll(async () => {
  await mongoose.connection.close()
})