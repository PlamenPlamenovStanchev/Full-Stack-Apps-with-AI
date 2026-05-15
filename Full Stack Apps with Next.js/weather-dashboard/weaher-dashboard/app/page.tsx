import { Suspense } from 'react';
import Link from 'next/link';
import WeatherCardAsync from '@/components/WeatherCardAsync';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { POPULAR_CITIES } from '@/lib/weather';

// Enable ISR with 5-minute revalidation
export const revalidate = 300;

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Check weather for popular cities around the world',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">🌍 Weather Dashboard</h1>
              <p className="text-gray-600 mt-2">Check weather for major cities worldwide</p>
            </div>
            <Link
              href="/search"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              🔍 Search Cities
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CITIES.map((city) => (
            <Suspense key={city.name} fallback={<WeatherSkeleton />}>
              <WeatherCardAsync city={city} />
            </Suspense>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>Weather data provided by Open-Meteo API | Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </footer>
    </div>
  );
}
