'use client';

// Skeleton loader for weather cards
export default function WeatherSkeleton() {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6 shadow-lg h-full animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-8 bg-blue-500 rounded w-32 mb-2"></div>
          <div className="h-4 bg-blue-500 rounded w-24"></div>
        </div>
        <div className="h-12 w-12 bg-blue-500 rounded"></div>
      </div>

      <div className="mb-4">
        <div className="h-16 bg-blue-500 rounded w-24 mb-2"></div>
        <div className="h-5 bg-blue-500 rounded w-32"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <div className="h-4 bg-blue-500 rounded w-20 mb-1"></div>
          <div className="h-5 bg-blue-500 rounded w-16"></div>
        </div>
        <div>
          <div className="h-4 bg-blue-500 rounded w-20 mb-1"></div>
          <div className="h-5 bg-blue-500 rounded w-16"></div>
        </div>
      </div>

      <div className="pt-4 border-t border-blue-300">
        <div className="h-4 bg-blue-500 rounded w-24"></div>
      </div>
    </div>
  );
}
