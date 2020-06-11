import React, { useState } from 'react'

const Entry = ({ name, number }) => (
  <li>
    {name} {number}
  </li>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const regex = new RegExp(`.*${newFilter}`, 'i')

  const notesToShow = newFilter
    ? persons.filter(obj => regex.test(obj.name))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(ojb => ojb.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter by name: <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h3>Entries</h3>
      <ul>
        {notesToShow.map(person => <Entry key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </div>
  )
}

export default App
