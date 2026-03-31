import { useState } from 'react'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={notesToShow}/>
    
    </div>
  )

}

export default App