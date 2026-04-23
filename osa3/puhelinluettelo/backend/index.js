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
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${notes.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newID = notes.length > 0
    ? Math.floor(Math.random() * 1000000)
    : "0"

  const person = request.body
  person.id = String(newID)

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  if (notes.find(note => note.name === person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  notes = notes.concat(person)

  morgan.token('person', function (req, res) { return JSON.stringify(person) })

  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})