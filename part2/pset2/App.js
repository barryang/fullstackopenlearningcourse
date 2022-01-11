import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Description = ({ country, show, city }) => {
  if (country.length > 10) {
    
    return <div>Too many matches, specify another filter</div>
  
  } else if (country.length > 1) {
    
    return <div>{country.map(e => <div key={e.idd.suffixes}>{e.name.common}<button onClick={show} value={e.name.common}>show</button></div>)}</div>
  
  } else if (country.length === 1) {
    let sc = country[0];
    let langid = 0;
    
    return (
      <div>
        <h1>{sc.name.common}</h1>
        <div>{sc.capital}</div>
        <div>{sc.population}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(sc.languages).map(e => 
          <li key={langid += 1}>
            {e}
          </li>)}
        </ul>
        <img src={sc.flags.png} alt={sc.name.common + 'flag'}></img>
        <h2>Weather in {sc.capital}</h2>
        <div><b>temperature:</b>{city.main.temp - 273.15} Celcius</div>
        <div>{city.weather[0].description}</div>
        <div><b>wind:</b>{city.wind.speed} {city.wind.deg}</div>
      </div>
    )
  } else {
    return <div>INVALID SEARCH</div>
  }
}

const App = () => {
  const[stored, setStored] = useState([])
  const[display, setNewDisplay] = useState([])
  const[query, setNewQuery] = useState('')
  const[city, setCity] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        setStored(response.data)
      })
  }, [])

  

  const search = (event) => {
    setNewQuery(event.target.value)
    let sV = event.target.value
    let list = []
    stored.forEach(e => {
      if (e.name.common.includes(sV)) {
        list.push(e)
      }
    })
    setNewDisplay(list)
  }

  useEffect(() => {
    console.log('effect')
    console.log(display.length)
    if (display.length === 1) {
      let sc = display[0]
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${sc.capital}&appid=${api_key}`)
      .then(response => {
        console.log('promise fufilled')
        setCity(response.data)
      })
    }
  }, [display])

  return (
    <div>
      <form>
        find countries <input onChange={search} value={query}/>
      </form>
        <Description country={display} show={search} city={city}/>
    </div>
  )
}

export default App
