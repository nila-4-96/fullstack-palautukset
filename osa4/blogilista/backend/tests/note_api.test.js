const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
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

describe('when there is initially some blogs saved', () => {

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
})

describe('blog addition & editing', () => {
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

  test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
      id: blogToUpdate.id
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    // console.log('blogInDb:', blogInDb)
    // console.log('updatedBlog:', updatedBlog)

    assert.deepStrictEqual(blogInDb, updatedBlog)
  })
})


describe('blog error handling', () => {
  test('blog id field is called id', async () => {
    const response = await api.get('/api/blogs')

    /*console.log(
      'Object.keys(response.body[0]):',
      Object.keys(response.body[0]),
    )*/

    assert(Object.keys(response.body[0]).includes('id'))
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

  test('blog without a title returns 400', async () => {
    const postBlog = {
      author: 'Pim',
      url: 'https://www.merriam-webster.com/',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blog without a url returns 400', async () => {
    const postBlog = {
      title: 'Yet another indie site',
      author: 'Pim',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})