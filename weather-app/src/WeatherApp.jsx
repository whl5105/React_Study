import React from 'react'
import CurrentWeather from './CurrentWeather/CurrentWeather'
import "./styles.css";
import TempInfo from './TempInfo/TempInfo';

function WeatherApp() {
  return (
      <div className='container'>
        <CurrentWeather/>
        <TempInfo/>
      </div>
  )
}

export default WeatherApp