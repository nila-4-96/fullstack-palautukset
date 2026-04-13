const Countries = ({ countries, handleShow }) => {
  if (countries.length === 1) {
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