const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.ju2drhk.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})


const Note = mongoose.model('Note', noteSchema)

const person = new Note({
  name: personName,
  number: personNumber
})

if (process.argv.length === 3) {
  Note.find({}).then(result => {
  console.log('phonebook:')
    result.forEach(note => {
    console.log(`${note.name} ${note.number}`)
  })
  mongoose.connection.close()
  })

} else if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })

} else {
  process.exit(1)
}