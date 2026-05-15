'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchCities, CityCoordinates } from '@/lib/weather';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityCoordinates[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (value: string) => {
      setQuery(value);
      setError('');

      if (value.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const cities = await searchCities(value);
        setResults(cities);
      } catch (err) {
        setError('Failed to search cities. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSelectCity = (city: CityCoordinates) => {
    router.push(`/city/${encodeURIComponent(city.name)}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city (e.g., 'London', 'Tokyo', 'New York')..."
          className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          autoFocus
        />
        {loading && (
          <div className="absolute right-4 top-3">
            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white border boundary rounded-lg shadow-lg overflow-hidden">
          {results.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSelectCity(city)}
              className="w-full text-left px-6 py-4 hover:bg-blue-50 border-b last:border-b-0 transition-colors flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{city.name}</p>
                <p className="text-sm text-gray-500">{city.country}</p>
              </div>
              <span className="text-blue-500 font-semibold">→</span>
            </button>
          ))}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && !loading && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-600">
          <p>No cities found for "{query}". Try another search.</p>
        </div>
      )}

      {query.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center text-blue-700">
          <p className="font-semibold mb-2">Start searching for a city</p>
          <p className="text-sm">Type the name of any city in the search box above</p>
        </div>
      )}
    </div>
  );
}
