import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, handleShow }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (countries.length === 1) {
      console.log('effect run, city is now', countries[0].capital)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [countries])
  
  if (countries.length === 1) {
    if (weather === null) {
      return <div>...</div>
    }
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <h2>Languages: </h2>
        <ul>
          {Object.values(countries[0].languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={countries[0].flags.png}/>

        <h2>Weather in {countries[0].capital}</h2>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
      )
    } else if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  
  } else {
    return (
      <div>
        {countries.map(country => 
          <p key={country.name.common}>{country.name.common} 
          <button onClick={() => handleShow(country)}>Show</button>
          </p>
        )}
      </div>
  )}
}

export default Countries