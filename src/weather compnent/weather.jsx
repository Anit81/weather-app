import axios from 'axios'
import { useState } from 'react'
import './weather.css'


export function WeathearAppComponent(){
    const [weather,setWeather] = useState(null)
  const [inputChat,setInputChat] = useState("")

    function inputField(e){
     setInputChat(e.target.value);
     
  }
  function fetchWeather(){
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputChat}&appid=a108952fee88ccd6420c92692e15d1cc&units=metric`)
.then((response) => {
      setWeather(response.data)
      setInputChat("");
    })

}

  return (
    <>
    <div className='input-btn'>
        <input placeholder='Type your city' className='input-field' onChange={inputField} value={inputChat} />
      <button className='butt' onClick={fetchWeather}>send</button>
    </div>
      
      {weather &&
          <>
            <p className='city'>City: {weather.name}</p>
        <p className='temp'>Temperature: <span>{weather.main.temp} </span><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /></p>
        <p className='condition'>Condition: {weather.weather[0].description}</p>
        
 
        </>
      }
      </>
  )
}