import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState()
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`)
      .then(response =>
        setWeatherData(response.data)
      )
  }, [capital, apiKey])

  if (weatherData) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><b>Temperature:</b> {weatherData.current.temperature}&deg; Celsius</p>
        <img src={weatherData.current.weather_icons} alt='Weather Icon' />
        <p><b>Wind:</b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
      </div>
    )
  }

  return <p>Loading weather data</p>
}

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

      <Weather capital={filteredCountries[0].capital} />
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

const Info = ({ filteredCountries, setFilter }) => {
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
      <Info filteredCountries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
