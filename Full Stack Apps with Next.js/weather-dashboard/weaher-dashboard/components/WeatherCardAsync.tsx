import WeatherCard from './WeatherCard';
import { fetchWeather, getWeatherDescription, CityCoordinates } from '@/lib/weather';

interface WeatherCardAsyncProps {
  city: CityCoordinates;
}

// Server component that fetches weather for a single city
export default async function WeatherCardAsync({ city }: WeatherCardAsyncProps) {
  try {
    const data = await fetchWeather(city.latitude, city.longitude);

    if (!data.current) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-600">
          <p>Unable to load weather data for {city.name}</p>
        </div>
      );
    }

    return (
      <WeatherCard
        city={city.name}
        country={city.country}
        temperature={data.current.temperature_2m}
        weatherCode={data.current.weather_code}
        condition={getWeatherDescription(data.current.weather_code)}
        humidity={data.current.relative_humidity_2m}
        windSpeed={data.current.wind_speed_10m}
      />
    );
  } catch (error) {
    console.error(`Error fetching weather for ${city.name}:`, error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-600">
        <p>Failed to load weather for {city.name}</p>
      </div>
    );
  }
}
