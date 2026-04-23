-- Create the vault table
CREATE TABLE vault (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_name text NOT NULL,
  encrypted_username text NOT NULL,
  encrypted_password text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE vault ENABLE ROW LEVEL SECURITY;

-- Allow users to only select and insert their own data
CREATE POLICY "Users can only view their own vault entries"
  ON vault FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own vault entries"
  ON vault FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit their own vault entries"
  ON vault FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vault entries"
  ON vault FOR DELETE
  USING (auth.uid() = user_id);
