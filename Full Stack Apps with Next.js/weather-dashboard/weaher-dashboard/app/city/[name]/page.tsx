import Link from 'next/link';
import Forecast from '@/components/Forecast';
import {
  fetchWeather,
  getCityCoordinates,
  getWeatherDescription,
  getWeatherEmoji,
} from '@/lib/weather';

// Dynamic rendering - SSR (Server-Side Rendering)
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    name: string;
  };
}

export async function generateMetadata({ params: { name } }: PageProps) {
  const decodedName = decodeURIComponent(name);
  const cityCoords = await getCityCoordinates(decodedName);

  if (!cityCoords) {
    return {
      title: `${decodedName} - Weather Dashboard`,
      description: `Check weather forecast for ${decodedName}`,
    };
  }

  const weather = await fetchWeather(cityCoords.latitude, cityCoords.longitude, true);

  const temp = weather.current?.temperature_2m ?? 0;
  const condition = getWeatherDescription(weather.current?.weather_code || 0);

  return {
    title: `${decodedName} - Weather Dashboard | ${Math.round(temp)}°C`,
    description: `Weather forecast for ${decodedName}, ${cityCoords.country}. Current: ${condition}`,
    openGraph: {
      title: `Weather in ${decodedName}`,
      description: `${Math.round(temp)}°C - ${condition}`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params: { name } }: PageProps) {
  const decodedName = decodeURIComponent(name);
  const cityCoords = await getCityCoordinates(decodedName);

  if (!cityCoords) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold mb-2 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              City "{decodedName}" not found. Please try another search.
            </p>
            <Link
              href="/search"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold inline-block"
            >
              Search for a city
            </Link>
          </div>
        </main>
      </div>
    );
  }

  try {
    const weather = await fetchWeather(cityCoords.latitude, cityCoords.longitude, true);

    if (!weather.current || !weather.daily) {
      throw new Error('Missing weather data');
    }

    const forecastData = weather.daily.time.map((date, index) => ({
      date,
      maxTemp: weather.daily!.temperature_2m_max[index],
      minTemp: weather.daily!.temperature_2m_min[index],
      weatherCode: weather.daily!.weather_code[index],
      precipitation: weather.daily!.precipitation_sum[index],
      windSpeed: weather.daily!.wind_speed_10m_max[index],
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {getWeatherEmoji(weather.current.weather_code)} {decodedName}
                </h1>
                <p className="text-gray-600 mt-1">{cityCoords.country}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gray-900">
                  {Math.round(weather.current.temperature_2m)}°
                </p>
                <p className="text-lg text-gray-600 text-right">
                  {getWeatherDescription(weather.current.weather_code)}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Current Weather Details */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Current Conditions</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Temperature</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(weather.current.temperature_2m)}°C
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Feels Like</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(weather.current.apparent_temperature)}°C
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Humidity</p>
                <p className="text-3xl font-bold text-blue-600">{weather.current.relative_humidity_2m}%</p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Wind Speed</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(weather.current.wind_speed_10m)} km/h
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Precipitation</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(weather.current.precipitation)} mm
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Timezone</p>
                <p className="text-lg font-semibold text-gray-800">{weather.timezone}</p>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-lg shadow p-8">
            <Forecast forecast={forecastData} />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white mt-12 border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
            <p>
              Weather data provided by Open-Meteo API | Coordinates: {cityCoords.latitude.toFixed(2)}°,{' '}
              {cityCoords.longitude.toFixed(2)}°
            </p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error fetching weather data:', error);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold mb-2 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-red-600 text-lg mb-4">
              Unable to load weather data for {decodedName}. Please try again.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold inline-block"
            >
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
