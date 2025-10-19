import { useState } from 'react'
import axios from 'axios'
import './weather.css'

export function WeathearAppComponent() {
  const [weather, setWeather] = useState(null)
  const [inputChat, setInputChat] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setInputChat(e.target.value)
  }

  const fetchWeather = async () => {
    if (!inputChat.trim()) {
      setError("Please enter a city name.")
      return
    }

    setError(null)
    setWeather(null)
    setLoading(true)

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputChat}&appid=a108952fee88ccd6420c92692e15d1cc&units=metric`
      )
      setWeather(res.data)
      setInputChat("")
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please check the spelling.")
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your internet connection.")
      } else {
        setError("Something went wrong. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-container">
      <h1>Search your city weather condition</h1>

      <div className="input-btn">
        <input
          type="text"
          placeholder="Type your city"
          className="input-field"
          value={inputChat}
          onChange={handleChange}
        />
        <button className="butt" onClick={fetchWeather}>
          Send
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && !loading && (
        <div className="weather-card">
          <p className="city">City: {weather.name}</p>
          <p className="temp">
            Temperature: <span>{weather.main.temp}</span>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </p>
          <p className="condition">
            Condition: {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  )
}
