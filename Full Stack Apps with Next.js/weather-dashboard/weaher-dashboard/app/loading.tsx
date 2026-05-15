'use client';

import WeatherSkeleton from '@/components/WeatherSkeleton';

// Loading skeleton shown while page is rendering
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-96 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-10 bg-blue-300 rounded w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <WeatherSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
