// Utility functions for fetching weather data from Open-Meteo API

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation: number[];
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface CityCoordinates {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

const BASE_URL = 'https://api.open-meteo.com/v1';

// WMO Weather Code interpretation
export function getWeatherDescription(code: number): string {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
}

export function getWeatherEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 86) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌍';
}

// Fetch weather data by coordinates
export async function fetchWeather(
  latitude: number,
  longitude: number,
  daily: boolean = false
): Promise<WeatherData> {
  let url = `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation&timezone=auto`;
  
  if (daily) {
    url += '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max';
  }

  const response = await fetch(url, { 
    next: { revalidate: 300 },
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Weather-Dashboard/1.0',
    }
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'Unable to read response body');
    console.error(`Weather API error for [${latitude}, ${longitude}]: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  return response.json();
}

// Search for cities by name
export async function searchCities(query: string): Promise<CityCoordinates[]> {
  if (query.length < 2) return [];

  const params = new URLSearchParams({
    name: query,
    count: '10',
    language: 'en',
    format: 'json',
  });

  const url = `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.results) return [];

  return data.results.map((result: any) => ({
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country || '',
  }));
}

// Get coordinates for a specific city
export async function getCityCoordinates(cityName: string): Promise<CityCoordinates | null> {
  try {
    const results = await searchCities(cityName);
    if (results.length === 0) return null;

    // Return the first (most relevant) result
    return results[0];
  } catch (error) {
    console.error('Error getting city coordinates:', error);
    return null;
  }
}

// Predefined popular cities
export const POPULAR_CITIES: CityCoordinates[] = [
  { name: 'Sofia', latitude: 42.6977, longitude: 23.3219, country: 'Bulgaria' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom' },
  { name: 'New York', latitude: 40.7128, longitude: -74.006, country: 'United States' },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, country: 'Japan' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, country: 'Australia' },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522, country: 'France' },
];
