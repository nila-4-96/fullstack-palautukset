import { useState, useEffect, use } from 'react'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'
import noteService from './services/notes'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nF = persons.find(person => person.name === newName)
    if (nF !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleShowAllChange = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete " + persons.find(person => person.id === id).name + " ?")) {
      noteService
        .deleteOne(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  function persFilter(person) {
    return person.name.toLowerCase().includes(showAll.toLowerCase())
  }

  const notesToShow = showAll === ''
    ? persons
    : persons.filter(persFilter)

  return (
    <div>
      
      <h1>Phonebook</h1>
      <Filter showAll={showAll} handleShowAllChange={handleShowAllChange}/>
      <h1>add a new</h1>
      <Form addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h1>Numbers</h1>
      <Persons persons={notesToShow} handleDelete={handleDelete}/>

    </div>
  )

}

export default App