-- Enable the necessary extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone_number text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
  ON public.user_profiles FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY "Users can insert their own profile."
  ON public.user_profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.user_profiles FOR UPDATE
  USING ( auth.uid() = id );


-- Create listings table
CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Listings are viewable by everyone."
  ON public.listings FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own listings."
  ON public.listings FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own listings."
  ON public.listings FOR UPDATE
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own listings."
  ON public.listings FOR DELETE
  USING ( auth.uid() = user_id );


-- Create listing_photos table
CREATE TABLE public.listing_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.listing_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Listing photos are viewable by everyone."
  ON public.listing_photos FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert photos for their own listings."
  ON public.listing_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE public.listings.id = listing_id AND public.listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update photos for their own listings."
  ON public.listing_photos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE public.listings.id = listing_id AND public.listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete photos for their own listings."
  ON public.listing_photos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE public.listings.id = listing_id AND public.listings.user_id = auth.uid()
    )
  );


-- Create storage bucket 'listing-photos'
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-photos', 'listing-photos', true);

-- Storage policies
CREATE POLICY "Anyone can view listing photos."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'listing-photos' );

CREATE POLICY "Authenticated users can upload listing photos."
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK ( bucket_id = 'listing-photos' );

CREATE POLICY "Users can update their own listing photos."
  ON storage.objects FOR UPDATE
  TO authenticated
  USING ( bucket_id = 'listing-photos' and auth.uid() = owner );

CREATE POLICY "Users can delete their own listing photos."
  ON storage.objects FOR DELETE
  TO authenticated
  USING ( bucket_id = 'listing-photos' and auth.uid() = owner );
