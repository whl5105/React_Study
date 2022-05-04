import {Box, Tabs, Tab} from '@mui/material'
import React, { useState } from 'react'
import HumidityGraph from '../HumidityGraph/HumidityGraph'
import WeatherGraph from '../WeatherGraph/WeatherGraph'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function Tabpanel({children, value, index}){
  return(
    <div hidden={value !== index}> 
      {value === index && <Box>{children}</Box>}
    </div>
  )
}




function WeatherTab() {
  const [value,setValue] = useState(0)
  const handleChange = (event,newValue)=>{
    setValue(newValue)
  }
  return (
    <Box sx={{width:"100%"}}>
      <Box sx={{borderBottom:1, borderColor:'divider'}}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="날씨" />
          <Tab label="습도" />
          <Tab label="바람" />
        </Tabs>
      </Box>
      <Tabpanel value={value} index={0}><WeatherGraph /></Tabpanel>
      <Tabpanel value={value} index={1}><HumidityGraph/></Tabpanel>
      <Tabpanel value={value} index={2}>3</Tabpanel>
    </Box>
  )
}

export default WeatherTab