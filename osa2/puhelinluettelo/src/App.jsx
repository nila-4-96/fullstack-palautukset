import { useState } from 'react'

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
      
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div> filter shown with <input value={showAll} onChange={handleShowAllChange}/></div>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      <div>
        {notesToShow.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    
    </div>
  )

}

export default App