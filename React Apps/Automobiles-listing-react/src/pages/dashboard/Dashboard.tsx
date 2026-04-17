import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  created_at: string;
  listing_photos: { url: string }[];
}

const PAGE_SIZE = 6;

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMyListings() {
      if (!user) return;
      
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from('listings')
        .select(`
          id, title, price, location, created_at,
          listing_photos (url)
        `, { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (!error && data) {
        setListings(data as any);
        if (count !== null) {
          setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)));
        }
      }
      setLoading(false);
    }

    fetchMyListings();
  }, [user, page]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your active listings</p>
        </div>
        <Link 
          to="/dashboard/publish" 
          className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 font-medium whitespace-nowrap shadow-sm transition-colors"
        >
          + Create New Listing
        </Link>
      </div>

      <div className="bg-transparent">
        {loading ? (
          <div className="flex justify-center items-center h-48 text-gray-500 font-medium">
            Loading your listings...
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-dashed border-gray-300">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No listings found</h2>
            <p className="text-gray-500 mb-6">You haven't created any vehicle listings yet.</p>
            <Link to="/dashboard/publish" className="text-blue-600 font-medium hover:underline">
              Publish your first listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const coverPhoto = listing.listing_photos?.[0]?.url || 'https://via.placeholder.com/300x200?text=No+Image';
              return (
                <div key={listing.id} className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
                  <img 
                    src={coverPhoto} 
                    alt={listing.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-5 flex flex-col flex-grow bg-white">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{listing.title}</h3>
                    <p className="text-xl font-semibold text-blue-600 mt-1">${listing.price.toLocaleString()}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                      <span>{listing.location}</span>
                      <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex bg-gray-50 border-t border-gray-100 divide-x divide-gray-200">
                    <Link 
                      to={`/dashboard/edit/${listing.id}`} 
                      className="flex-1 py-3 text-center text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/dashboard/delete/${listing.id}`} 
                      className="flex-1 py-3 text-center text-gray-700 font-medium hover:bg-gray-100 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 font-medium shadow-sm transition-all"
            >
              &larr; Previous
            </button>
            <span className="text-gray-600 font-medium px-4">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 font-medium shadow-sm transition-all"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
