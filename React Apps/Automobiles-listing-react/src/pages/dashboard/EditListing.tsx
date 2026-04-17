import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [existingPhotos, setExistingPhotos] = useState<{ id: string; url: string }[]>([]);
  const [photosToRemove, setPhotosToRemove] = useState<{ id: string; url: string }[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchListing() {
      if (!id || !user) return;
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*, listing_photos(id, url)')
          .eq('id', id)
          .eq('user_id', user.id) // Ensure user owns the listing
          .single();

        if (error) throw error;
        if (!data) throw new Error('Listing not found or access denied');

        setTitle(data.title || '');
        setPrice(data.price?.toString() || '');
        setLocation(data.location || '');
        setDescription(data.description || '');
        setExistingPhotos(data.listing_photos || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load listing.');
        setTimeout(() => navigate('/dashboard'), 3000);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListing();
  }, [id, user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleRemoveExisting = (photo: { id: string; url: string }) => {
    setPhotosToRemove((prev) => [...prev, photo]);
    setExistingPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  const handleRemoveNew = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user) return;

    if (!title || !price || !location || !description) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // 1. Update Listing Details
      const { error: updateError } = await supabase
        .from('listings')
        .update({
          title,
          price: parseFloat(price),
          location,
          description,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // 2. Delete Removed Photos (Storage & DB)
      if (photosToRemove.length > 0) {
        const filePathsToRemove = photosToRemove.map((p) => {
          // Extract the filename from the public URL. Depending on the exact URL format,
          // the standard Supabase public URL typically ends in `/listing-photos/file/path`
          // We can split by `/listing-photos/` and take the second part
          const urlParts = p.url.split('/listing-photos/');
          return urlParts.length > 1 ? urlParts[1] : '';
        }).filter(Boolean);

        // Remove from storage if paths found
        if (filePathsToRemove.length > 0) {
          const { error: storageError } = await supabase.storage
            .from('listing-photos')
            .remove(filePathsToRemove);
          
          if (storageError) {
            console.error('Error removing old photos from storage:', storageError.message);
          }
        }

        // Remove mapping from listing_photos
        const photoIdsToRemove = photosToRemove.map((p) => p.id);
        const { error: dbPhotoRemoveError } = await supabase
          .from('listing_photos')
          .delete()
          .in('id', photoIdsToRemove);
        
        if (dbPhotoRemoveError) {
          console.error('Error removing old photos from db:', dbPhotoRemoveError.message);
        }
      }

      // 3. Upload New Photos
      if (newFiles.length > 0) {
        for (const file of newFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${id}/${fileName}`;

          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from('listing-photos')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading new photo:', uploadError.message);
            continue;
          }

          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from('listing-photos')
            .getPublicUrl(filePath);

          // Add to listing_photos
          const { error: photoDbError } = await supabase
            .from('listing_photos')
            .insert({
              listing_id: id,
              url: publicUrlData.publicUrl,
            });

          if (photoDbError) {
            console.error('Error saving new photo mapping:', photoDbError.message);
          }
        }
      }

      // Success -> Dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Update error:', err);
      setError(err.message || 'An error occurred while updating the listing.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8 text-gray-500">Loading listing details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Listing</h1>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Car Title *</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price ($) *</label>
          <input 
            type="number" 
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Location *</label>
          <input 
            type="text" 
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description *</label>
          <textarea 
            rows={4} 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Manage Photos</label>
          
          {/* Existing Photos */}
          {existingPhotos.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Existing Photos:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {existingPhotos.map((photo) => (
                  <div key={photo.id} className="relative group rounded-md overflow-hidden border">
                    <img src={photo.url} alt="Car" className="w-full h-24 object-cover" />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveExisting(photo)}
                      className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Files Upload Box */}
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex justify-center text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Add More Files</span>
                  <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-gray-500">Select new images (PNG, JPG, GIF)</p>
            </div>
          </div>

          {/* New Files Selected List */}
          {newFiles.length > 0 && (
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {newFiles.map((file, i) => (
                <li key={i} className="flex justify-between items-center text-sm text-gray-600 border px-3 py-2 rounded bg-gray-50">
                  <span className="truncate mr-2">{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveNew(i)}
                    className="text-red-500 hover:text-red-700 font-medium whitespace-nowrap"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            disabled={isSaving}
            className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
