import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function DeleteListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || !user) return;

    async function fetchListing() {
      const { data, error } = await supabase
        .from('listings')
        .select('title')
        .eq('id', id)
        .eq('user_id', user.id) // Ensure we only fetch if they own it!
        .single();
        
      if (error) {
        setError('Listing not found or you don\'t have permission to delete it.');
      } else if (data) {
        setTitle(data.title);
      }
      setLoading(false);
    }
    
    fetchListing();
  }, [id, user]);

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    setError('');

    // Step 1: Best effort to remove images from Supabase Storage first 
    // to prevent orphaned files because standard nested DB cascades don't affect Storage API objects
    const { data: files } = await supabase.storage.from('listing-photos').list(id);
    if (files && files.length > 0) {
      const filePathsToRemove = files.map(file => `${id}/${file.name}`);
      await supabase.storage.from('listing-photos').remove(filePathsToRemove);
    }

    // Step 2: Delete DB record (will also cascade delete rules in 'listing_photos')
    const { error: dbError } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (dbError) {
      setError(dbError.message);
      setDeleting(false);
    } else {
      navigate('/dashboard'); // Go back smoothly
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500 font-medium">Verify listing...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow border border-red-100 mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Delete Listing?</h1>
      
      {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-sm mx-auto w-full">{error}</div>}
      
      {!error && (
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          Are you sure you want to permanently delete <strong className="text-gray-900 border-b border-gray-200">{title}</strong>? This action cannot be undone and will erase all photos instantly.
        </p>
      )}

      <div className="flex gap-4 justify-center">
        <Link to="/dashboard" className="px-6 py-2 border border-gray-300 rounded bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">
          Cancel
        </Link>
        {!error && (
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium disabled:opacity-50 transition-colors"
          >
            {deleting ? 'Deleting...' : 'Yes, Delete It'}
          </button>
        )}
      </div>
    </div>
  );
}
