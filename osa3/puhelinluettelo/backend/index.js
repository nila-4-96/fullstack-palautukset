require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Note = require('./models/note')

app.use(express.static('dist'))

morgan.token('id', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'))


app.use(express.json())

app.get('/api/persons', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

/*
app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${notes.length} people</p>
    <p>${new Date()}</p>`
  )
})
*/

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Note({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})