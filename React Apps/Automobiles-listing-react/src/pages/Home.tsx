import { useEffect, useState } from 'react';
import ListingCard from '../components/ui/ListingCard';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

// Simple interface for our listing data
interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  created_at: string;
  listing_photos: { url: string }[];
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestListings() {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          id, title, price, location, created_at,
          listing_photos (
            url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setListings(data as any);
      }
      setLoading(false);
    }

    fetchLatestListings();
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center py-20 bg-blue-50 rounded-xl shadow-inner border border-blue-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to AutoMarket</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find your dream car today. Browse our latest listings and discover great deals in your area.
        </p>
        <Link to="/listings" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 font-medium shadow-md transition-all">
          Browse All Vehicles
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Latest Listings</h2>
          <Link to="/listings" className="text-blue-600 hover:text-blue-800 font-medium">View All &rarr;</Link>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading latest listings...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map(listing => (
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
            {listings.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10 bg-white rounded-lg border border-dashed">
                No listings found. Check back later!
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
