const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/note')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  // console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log('Response body:', response.body)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
  // console.log('response.body.length:', response.body.length)
  // console.log('helper.initialBlogs.length:', helper.initialBlogs.length)
})

test('blog id field is called id', async () => {
  const response = await api.get('/api/blogs')

  /*console.log(
    'Object.keys(response.body[0]):',
    Object.keys(response.body[0]),
  )*/

  assert(Object.keys(response.body[0]).includes('id'))
})

test('blog can be added using POST', async () => {
  const postBlog = {
    title: 'One more indie site',
    author: 'Pim',
    url: 'https://www.youtube.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(postBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  /*
  console.log('blogsAtEnd', blogsAtEnd)
  console.log('blogsAtEnd.length:', blogsAtEnd.length)
  console.log('helper.initialBlogs.length + 1:', helper.initialBlogs.length + 1)
  */

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('One more indie site'))
})

test('blog with undefined likes gets default value 0', async () => {
  const postBlog = {
    title: 'Yet another indie site',
    author: 'Pim',
    url: 'https://www.merriam-webster.com/'
  }

  await api
    .post('/api/blogs')
    .send(postBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual((blogsAtEnd.find(blog => blog.title === 'Yet another indie site').likes), 0)
})



after(async () => {
  await mongoose.connection.close()
})


/*
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

test('notes are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]


  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/blogs/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const ids = notesAtEnd.map(n => n.id)
  assert(!ids.includes(noteToDelete.id))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
*/