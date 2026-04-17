import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorAlert from './components/ErrorAlert'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState(null)

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    setCity(city)

    try {
      // Get coordinates from city name
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )
      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found')
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // Get weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,humidity&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=celsius&wind_speed_unit=kmh&forecast_days=7`
      )
      
      if (!weatherResponse.ok) {
        throw new Error(`API Error: ${weatherResponse.status}`)
      }
      
      const weatherData = await weatherResponse.json()

      if (!weatherData.current) {
        throw new Error('Invalid weather data received')
      }

      setWeather({
        city: name,
        country: country,
        ...weatherData.current,
        timezone: weatherData.timezone || 'Auto'
      })
      
      setForecast(weatherData.daily)
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Forecast</h1>
        <p>Enter a city to see the weather and forecast</p>
      </header>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {weather && (
        <>
          <WeatherDisplay weather={weather} />
          {forecast && <ForecastDisplay forecast={forecast} />}
        </>
      )}

      {!weather && !loading && !error && (
        <div className="empty-state">
          <p>Start by searching for a city</p>
        </div>
      )}
    </div>
  )
}

export default App
