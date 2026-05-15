'use client';

import Link from 'next/link';
import { getWeatherEmoji, getWeatherDescription } from '@/lib/weather';

interface WeatherCardProps {
  city: string;
  country: string;
  temperature: number;
  weatherCode: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherCard({
  city,
  country,
  temperature,
  weatherCode,
  condition,
  humidity,
  windSpeed,
}: WeatherCardProps) {
  const emoji = getWeatherEmoji(weatherCode);

  return (
    <Link href={`/city/${city}`}>
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{city}</h2>
            <p className="text-blue-100 text-sm">{country}</p>
          </div>
          <span className="text-4xl">{emoji}</span>
        </div>

        <div className="mb-4">
          <div className="text-5xl font-bold mb-1">{Math.round(temperature)}°C</div>
          <p className="text-blue-100">{condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-100">Humidity</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
          <div>
            <p className="text-blue-100">Wind Speed</p>
            <p className="font-semibold">{Math.round(windSpeed)} km/h</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-300">
          <p className="text-blue-100 text-sm">Click for 7-day forecast →</p>
        </div>
      </div>
    </Link>
  );
}
