import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils.jsx'
import { FiWind } from 'react-icons/fi'
import './WeatherDisplay.css'

function WeatherDisplay({ weather }) {
  if (!weather || weather.temperature_2m === undefined) {
    return null
  }
  
  const temp = Math.round(weather.temperature_2m || 0)
  const iconComponent = getWeatherIcon(weather.weather_code || 0)
  const description = getWeatherDescription(weather.weather_code || 0)

  return (
    <div className="weather-display">
      <div className="weather-card current-weather">
        <div className="weather-location">
          <h2>{weather.city}, {weather.country}</h2>
          <p className="timezone">{weather.timezone}</p>
        </div>

        <div className="weather-main">
          <div className="weather-icon-large">
            {iconComponent}
          </div>
          <div className="weather-info">
            <div className="temperature">
              <span className="temp-value">{temp}</span>
              <span className="temp-unit">°C</span>
            </div>
            <p className="weather-description">{description}</p>
          </div>
        </div>

        <div className="weather-extras">
          <div className="extra-item">
            <FiWind className="extra-icon" />
            <div>
              <span className="extra-label">Wind Speed</span>
              <p className="extra-value">{weather.wind_speed_10m} km/h</p>
            </div>
          </div>
          <div className="extra-item">
            <div className="extra-icon">💧</div>
            <div>
              <span className="extra-label">Humidity</span>
              <p className="extra-value">{weather.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
