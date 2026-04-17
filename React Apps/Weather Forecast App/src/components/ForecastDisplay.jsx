import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils.jsx'
import './ForecastDisplay.css'

function ForecastDisplay({ forecast }) {
  if (!forecast || !forecast.time) {
    return null
  }
  
  const days = (forecast.time || []).slice(0, 7)
  const codes = (forecast.weather_code || []).slice(0, 7)
  const temps_max = (forecast.temperature_2m_max || []).slice(0, 7)
  const temps_min = (forecast.temperature_2m_min || []).slice(0, 7)
  const precipitation = (forecast.precipitation_sum || []).slice(0, 7)
  
  if (days.length === 0) {
    return null
  }

  const formatDay = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="forecast-display">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-cards">
        {days.map((day, idx) => (
          <div key={idx} className="forecast-card">
            <div className="forecast-day">{formatDay(day)}</div>
            <div className="forecast-weather-icon">
              {getWeatherIcon(codes[idx], true)}
            </div>
            <div className="forecast-condition">
              {getWeatherDescription(codes[idx])}
            </div>
            <div className="forecast-temps">
              <span className="temp-max">{Math.round(temps_max[idx])}°</span>
              <span className="temp-min">{Math.round(temps_min[idx])}°</span>
            </div>
            {precipitation[idx] > 0 && (
              <div className="forecast-precipitation">
                <span>💧 {precipitation[idx]}mm</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastDisplay
