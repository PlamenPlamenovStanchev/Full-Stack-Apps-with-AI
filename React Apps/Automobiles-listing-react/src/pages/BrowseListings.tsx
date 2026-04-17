import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ListingCard from '../components/ui/ListingCard';

// Match existing interface with Home.tsx
interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  created_at: string;
  listing_photos: { url: string }[];
}

const PAGE_SIZE = 6;

export default function BrowseListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('listings')
        .select(`
          id, title, price, location, created_at,
          listing_photos (url)
        `, { count: 'exact' });

      // Apply search across multiple columns securely
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      // Order newest cars first and attach pagination boundaries
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (!error && data) {
        setListings(data as any); // Type cast due to relational map depth
        if (count !== null) {
          setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)));
        }
      } else if (error) {
        console.error('Error fetching listings:', error.message);
      }
      setLoading(false);
    }

    fetchListings();
  }, [page, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Ensure we jump back to page 1 on fresh search intent
    setSearchQuery(searchInput);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Browse Listings</h1>
          <p className="text-gray-600 mt-2">Search, filter, and page through all available vehicles.</p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 relative">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search cars or location..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72 shadow-sm"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
          Loading listings...
        </div>
      ) : (
        <>
          {listings.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500 flex flex-col items-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-xl font-semibold text-gray-600">No listings found</p>
              <p className="mt-2 text-sm">Try adjusting your search criteria and try again.</p>
              {searchQuery && (
                <button 
                  onClick={() => { setSearchInput(''); setSearchQuery(''); setPage(1); }} 
                  className="mt-6 text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard 
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  createdAt={listing.created_at}
                  imageUrl={listing.listing_photos?.[0]?.url}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 font-medium shadow-sm transition-all"
              >
                &larr; Previous
              </button>
              
              <span className="text-gray-600 font-medium px-4">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-5 py-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 font-medium shadow-sm transition-all"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
