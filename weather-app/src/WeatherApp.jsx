import React from 'react'
import CurrentWeather from './CurrentWeather/CurrentWeather'
import ExtraInfo from './ExtraInfo/ExtraInfo';
import "./styles.css";
import TempInfo from './TempInfo/TempInfo';

function WeatherApp() {
  return (
      <div className='container'>
        <CurrentWeather/>
        <TempInfo/>
        <ExtraInfo/>
      </div>
  )
}

export default WeatherApp