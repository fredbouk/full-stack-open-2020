import React from 'react'
import Entry from './Entry'

const Persons = ({ personsToShow, setPersons, persons, setNotification }) => (
  <ul>
    {personsToShow.map(person => <Entry key={person.id} id={person.id} name={person.name} number={person.number} setPersons={setPersons} persons={persons} setNotification={setNotification} />)}
  </ul>
)

export default Persons
