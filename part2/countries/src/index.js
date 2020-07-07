import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Country = ({ filteredCountries }) => {
  return (
    <div>
      <h1>{filteredCountries[0].name}</h1>
      <p>Capital: {filteredCountries[0].capital}</p>
      <p>Population: {filteredCountries[0].population}</p>

      <h2>Spoken languages</h2>
      <ul>
        {filteredCountries[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={filteredCountries[0].flag} alt='Contry Flag' width='150' height='100' />
    </div>
  )
}

const Countries = ({ filteredCountries, setFilter }) => {
  return (
    <div>
      <ul>
        {filteredCountries.map(country =>
          <li key={country.numericCode}>
            {country.name}
            &nbsp;<button onClick={() => setFilter(country.name)}>show</button>
          </li>)}
      </ul>
    </div>
  )
}

const View = ({ filteredCountries, setFilter }) => {
  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, please specify</div>
    )
  } else if (filteredCountries.length > 1) {
    return <Countries filteredCountries={filteredCountries} setFilter={setFilter} />
  } else if (filteredCountries.length === 1) {
    return <Country filteredCountries={filteredCountries} />
  }
  return (<></>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        setCountries(response.data)
      )
  }, [])

  const handleFilterChange = (evt) => {
    setFilter(evt.target.value)
  }

  const regex = new RegExp(`.*${filter}`, 'i')
  const filteredCountries = filter ? countries.filter(country => regex.test(country.name)) : []

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilterChange} />
      <View filteredCountries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
