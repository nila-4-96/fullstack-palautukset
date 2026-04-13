import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', country)
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(country)
  }
  
  function countFilter(fCountry) {
  return fCountry.name.common.toLowerCase().includes(country.toLowerCase())
  }

  const countriesToShow = country === ''
    ? countries
    : countries.filter(countFilter)


  return (
    <div>
    <Filter showAll={country} handleShowAllChange={handleChange}/>
    <Countries countries={countriesToShow} />
    </div>

  )
}

export default App