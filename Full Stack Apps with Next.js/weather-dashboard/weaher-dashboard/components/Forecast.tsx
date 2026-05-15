'use client';

import { getWeatherEmoji, getWeatherDescription } from '@/lib/weather';

interface DayForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitation: number;
  windSpeed: number;
}

interface ForecastProps {
  forecast: DayForecast[];
}

export default function Forecast({ forecast }: ForecastProps) {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow">
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-2">
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-3xl mb-2">{getWeatherEmoji(day.weatherCode)}</p>
              <p className="text-xs text-gray-600 mb-3 h-10">
                {getWeatherDescription(day.weatherCode)}
              </p>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-red-500 font-semibold">{Math.round(day.maxTemp)}°</span>
                  <span className="text-blue-500 font-semibold ml-2">
                    {Math.round(day.minTemp)}°
                  </span>
                </div>
                <div className="text-gray-600 text-xs">
                  <p>💧 {Math.round(day.precipitation)} mm</p>
                  <p>💨 {Math.round(day.windSpeed)} km/h</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
