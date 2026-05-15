import Link from 'next/link';
import SearchBox from '@/components/SearchBox';

// Static Site Generation (SSG) - page is generated at build time
export const dynamic = 'auto';

export const metadata = {
  title: 'Search Cities - Weather Dashboard',
  description: 'Find weather information for any city in the world',
};

export default function SearchPage() {
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
          <h1 className="text-4xl font-bold text-gray-900">🔍 Search for Cities</h1>
          <p className="text-gray-600 mt-2">Find weather information for any city in the world</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <SearchBox />
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="text-lg font-bold mb-2">Global Coverage</h3>
            <p className="text-gray-600">Search for any city worldwide and get accurate weather data</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-lg font-bold mb-2">Weekly Forecast</h3>
            <p className="text-gray-600">View 7-day weather forecast for any location</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-bold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">Get the latest weather information powered by Open-Meteo</p>
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Popular Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Moscow'].map((city) => (
              <Link
                key={city}
                href={`/city/${encodeURIComponent(city)}`}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors font-semibold text-blue-600"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>Weather data provided by Open-Meteo API</p>
        </div>
      </footer>
    </div>
  );
}
