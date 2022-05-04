import React from 'react'
import CurrentWeather from './CurrentWeather/CurrentWeather'
import "./styles.css";

function WeatherApp() {
  return (
      <div className='container'>
        <CurrentWeather/>
      </div>
  )
}

export default WeatherApp