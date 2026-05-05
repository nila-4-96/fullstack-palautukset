import { useState, useEffect, use } from 'react'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'
import noteService from './services/notes'
import NotificationS from './components/NotificationS'
import NotificationE from './components/NotificationE'
import Footer from './components/Footer'


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
  /* Tarkoituksella, tervehdys pysyy kunnes käyttäjä tekee jotain
  Sen voisi korvata 'useState(null)' jotta viesti ei näkyisi alussa 
  */
  const [addMessage, setAddMessage] = useState('Greetings!')
  const [errorMessage, setErrorMessage] = useState(null)  

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nF = persons.find(person => person.name === newName)
    if (nF !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        noteService
          .update(nF.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== nF.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setAddMessage(
              `Changed ${newName}`
            )
            setTimeout(() => {
            setAddMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== nF.id))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setAddMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
          setAddMessage(
            `Deleted ${persons.find(person => person.id === id).name}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${persons.find(person => person.id === id).name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
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
      <NotificationS message={addMessage} />
      <NotificationE message={errorMessage} />
      <h1>add a new</h1>
      <Form addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h1>Numbers</h1>
      <Persons persons={notesToShow} handleDelete={handleDelete}/>

    </div>
  )

}

export default App