import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!title || !price || !location || !description) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 1. Create the listing row
      const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          title,
          price: parseFloat(price),
          location,
          description,
        })
        .select()
        .single();

      if (listingError) throw listingError;
      if (!listingData) throw new Error('Listing creation failed');

      const listingId = listingData.id;

      // 2. Upload photos and insert mapping if there are files
      if (files.length > 0) {
        for (const file of files) {
          // Generate a unique file name
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${listingId}/${fileName}`;

          // Upload to storage bucket
          const { error: uploadError } = await supabase.storage
            .from('listing-photos')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading photo:', uploadError.message);
            // Optionally, we could continue or abort
            continue;
          }

          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from('listing-photos')
            .getPublicUrl(filePath);

          // Insert into listing_photos table
          const { error: photoDbError } = await supabase
            .from('listing_photos')
            .insert({
              listing_id: listingId,
              url: publicUrlData.publicUrl,
            });

          if (photoDbError) {
            console.error('Error saving photo mapping:', photoDbError.message);
          }
        }
      }

      // Success, go to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred while creating the listing.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Publish New Listing</h1>
      
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
            placeholder="e.g. 2018 Honda Civic" 
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
            placeholder="15000" 
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
            placeholder="City, State" 
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
            placeholder="Provide full details..." 
          />
        </div>
        
        <div>
          <label className="block font-medium text-gray-700">Photos (Optional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
          {files.length > 0 && (
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {files.map((file, i) => (
                <li key={i} className="text-sm text-gray-600 truncate border px-2 py-1 rounded bg-gray-50">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            disabled={isLoading}
            className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
