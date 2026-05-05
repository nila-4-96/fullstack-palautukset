const notesRouter = require('express').Router()
const Blog = require('../models/note')

notesRouter.get('/', (request, response) => {
  console.log('get success')
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

notesRouter.post('/', (request, response) => {
  console.log('post success')
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = notesRouter