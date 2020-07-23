import React from 'react'
import personService from '../services/resources'

const Entry = ({ id, name, number, setPersons, persons }) => {
  const removeAndUpdate = (id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.del(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <li>
      {name} {number}
      &nbsp; <button onClick={() => removeAndUpdate(id)}>delete</button>
    </li>
  )
}

export default Entry
