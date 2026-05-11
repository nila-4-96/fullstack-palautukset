const notesRouter = require('express').Router()
const Blog = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  if (body.likes === undefined) {
    blog.likes = 0
  }

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

notesRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter