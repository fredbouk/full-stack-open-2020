import React from 'react'
import Entry from './Entry'

const Persons = ({ notesToShow }) => (
  <ul>
    {notesToShow.map(person => <Entry key={person.name} name={person.name} number={person.number} />)}
  </ul>
)

export default Persons
