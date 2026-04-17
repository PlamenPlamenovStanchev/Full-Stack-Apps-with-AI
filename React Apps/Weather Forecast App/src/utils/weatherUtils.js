import {
  FiCloud,
  FiCloudRain,
  FiCloudSnow,
  FiZap,
  FiDroplets,
  FiEye,
  FiWind,
  FiSun,
  FiCloudDrizzle,
} from 'react-icons/fi'

// WMO Weather Code: https://open-meteo.com/en/docs
export function getWeatherIcon(code, small = false) {
  const size = small ? 24 : 48

  // Clear sky
  if (code === 0) {
    return <FiSun size={size} style={{ color: '#FFD700' }} />
  }

  // Mainly Clear
  if (code === 1 || code === 2) {
    return <FiSun size={size} style={{ color: '#FFD700' }} />
  }

  // Overcast
  if (code === 3) {
    return <FiCloud size={size} style={{ color: '#A9A9A9' }} />
  }

  // Fog or Mist
  if (code === 45 || code === 48) {
    return <FiEye size={size} style={{ color: '#C0C0C0' }} />
  }

  // Drizzle
  if (code === 51 || code === 53 || code === 55) {
    return <FiCloudDrizzle size={size} style={{ color: '#87CEEB' }} />
  }

  // Rain
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
    return <FiCloudRain size={size} style={{ color: '#4682B4' }} />
  }

  // Snow
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return <FiCloudSnow size={size} style={{ color: '#B0E0E6' }} />
  }

  // Thunderstorm
  if (code === 80 || code === 81 || code === 82 || code === 95 || code === 96 || code === 99) {
    return <FiZap size={size} style={{ color: '#FFD700' }} />
  }

  // Default
  return <FiCloud size={size} style={{ color: '#A9A9A9' }} />
}

export function getWeatherDescription(code) {
  switch (code) {
    case 0:
      return 'Clear Sky'
    case 1:
      return 'Mainly Clear'
    case 2:
      return 'Partly Cloudy'
    case 3:
      return 'Overcast'
    case 45:
      return 'Foggy'
    case 48:
      return 'Foggy (depositing)'
    case 51:
      return 'Light Drizzle'
    case 53:
      return 'Moderate Drizzle'
    case 55:
      return 'Dense Drizzle'
    case 61:
      return 'Slight Rain'
    case 63:
      return 'Moderate Rain'
    case 65:
      return 'Heavy Rain'
    case 71:
      return 'Slight Snow'
    case 73:
      return 'Moderate Snow'
    case 75:
      return 'Heavy Snow'
    case 77:
      return 'Snow Grains'
    case 80:
      return 'Slight Rain Showers'
    case 81:
      return 'Moderate Rain Showers'
    case 82:
      return 'Violent Rain Showers'
    case 85:
      return 'Slight Snow Showers'
    case 86:
      return 'Heavy Snow Showers'
    case 95:
      return 'Thunderstorm'
    case 96:
      return 'Thunderstorm with Hail'
    case 99:
      return 'Thunderstorm with Hail'
    default:
      return 'Unknown'
  }
}
