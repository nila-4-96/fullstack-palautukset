const morgan = require('morgan')
const notesRouter = require('express').Router()
const Person = require('../models/note')

morgan.token('id', function (req) {
  return JSON.stringify(req.body)
})
notesRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'))


notesRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


notesRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {next(error)})
})


notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


notesRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})




notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = body.name
      person.number = body.number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

module.exports = notesRouter