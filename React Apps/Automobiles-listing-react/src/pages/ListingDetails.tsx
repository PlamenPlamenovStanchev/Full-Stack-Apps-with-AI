import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ListingDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  user_profiles: {
    name: string;
    email: string;
    phone_number: string | null;
  };
  listing_photos: {
    url: string;
  }[];
}

export default function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    async function fetchListing() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('listings')
        .select(`
          id, title, description, price, location, created_at,
          user_profiles (name, email, phone_number),
          listing_photos (url)
        `)
        .eq('id', id)
        .single();

      if (!error && data) {
        setListing(data as any);
      } else {
        console.error('Fetch error:', error?.message);
      }
      setLoading(false);
    }

    fetchListing();
  }, [id]);

  const nextPhoto = () => {
    if (!listing) return;
    setCurrentPhoto((prev) => (prev + 1) % listing.listing_photos.length);
  };

  const prevPhoto = () => {
    if (!listing) return;
    setCurrentPhoto((prev) => (prev - 1 + listing.listing_photos.length) % listing.listing_photos.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        Loading listing details...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="p-12 text-center bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Listing not found</h2>
        <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="text-blue-600 hover:text-blue-800 font-medium underline">
          &larr; Back to browse
        </Link>
      </div>
    );
  }

  const hasPhotos = listing.listing_photos && listing.listing_photos.length > 0;

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-lg max-w-5xl mx-auto overflow-hidden">
      
      {/* Image Slider */}
      <div className="relative bg-gray-200 h-[32rem] flex items-center justify-center overflow-hidden">
        {hasPhotos ? (
          <>
            <img 
              src={listing.listing_photos[currentPhoto].url} 
              alt={`${listing.title} - photo ${currentPhoto + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {listing.listing_photos.length > 1 && (
              <>
                <button 
                  onClick={prevPhoto} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors"
                  aria-label="Previous photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                  onClick={nextPhoto} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors"
                  aria-label="Next photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                
                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {listing.listing_photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(idx)}
                      className={`w-3 h-3 rounded-full transition-colors ${idx === currentPhoto ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <span className="text-gray-500 font-medium">No Images Available</span>
        )}
      </div>

      {/* Listing Details */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {listing.location}
              </span>
              <span>&bull;</span>
              <span>Listed {new Date(listing.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</span>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {listing.description || 'No description provided.'}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <p className="text-4xl font-bold text-blue-600 mb-2">${listing.price.toLocaleString()}</p>
            <p className="text-sm text-blue-800/70 font-medium">Excludes taxes & licensing fees</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Seller</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full mt-1">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase uppercase">Seller Name</p>
                  <p className="font-medium text-gray-800">{listing.user_profiles?.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full mt-1">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Email</p>
                  <a href={`mailto:${listing.user_profiles?.email}`} className="font-medium text-blue-600 hover:underline">
                    {listing.user_profiles?.email}
                  </a>
                </div>
              </div>

              {listing.user_profiles?.phone_number && (
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 p-2 rounded-full mt-1">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Phone</p>
                    <a href={`tel:${listing.user_profiles.phone_number}`} className="font-medium text-blue-600 hover:underline">
                      {listing.user_profiles.phone_number}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
