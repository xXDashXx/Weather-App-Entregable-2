import axios from 'axios'
import React, { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'
import gps from '../assets/gps.png'

const CardWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelcius, setisCelcius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (lat && lon) {
      const APIKey = '0b25644330f29d6403b4e96f70395402'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`,
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`
          }
          setTemperature(temp)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)

  const handleClick = () => {
    if (isCelcius === true) {
      setisCelcius(!isCelcius)
    }
    else {
      setisCelcius(!isCelcius)
    }
  }

  if (isLoading === true) {
    return < LoadingScreen />
  } else {
    return (
      <div className='container'>
        <div className='container__all'>
          <section className='container__all-header'>
            <h1>Weather App</h1>
            <h2><img className='gps' src={gps} alt="" />{`${weather?.name}, ${weather?.sys.country}`}</h2>
          </section>
          <div className='container__info'>
            <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <section>
              <div>
                <h3>"{weather?.weather[0].description}"</h3>
              </div>
              <ul>
                <li><span>Clouds: </span> {weather?.clouds.all} %</li>
                <li><span>Wind speed: </span> {weather?.wind.speed} meter/sec</li>
                <li><span>Pressure: </span> {weather?.main.pressure} hPa</li>
              </ul>
            </section>
          </div>
          <div className='container__fotter'>
            <h2 className='temp'> {isCelcius ? temperature?.celsius : temperature?.fahrenheit} </h2>
            <button className='btn' onClick={handleClick}> {isCelcius ? "Switch to °F" : "Switch to °C"} </button>
            
          </div>
        </div>
      </div>
    )
  }
}

export default CardWeather