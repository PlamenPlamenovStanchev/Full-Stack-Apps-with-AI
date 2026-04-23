# Bookmark Keeper (Expo + Supabase)

Mobile and web app built with React Native, Expo, and Expo Router to manage user bookmarks.

## Features

- Home screen with welcome text and login/register navigation
- Supabase Auth (email/password): Login + Register
- Bookmarks CRUD with dedicated screens:
  - View bookmark
  - Add bookmark
  - Edit bookmark
  - Delete bookmark
- Responsive layout for mobile and desktop web
- Local SQL migration files for database schema and security policies

## Routes

- `/` Home
- `/login` Login
- `/register` Register
- `/bookmarks` Bookmarks list
- `/bookmarks/add` Add bookmark
- `/bookmarks/[id]/view` View bookmark
- `/bookmarks/[id]/edit` Edit bookmark
- `/bookmarks/[id]/delete` Delete bookmark

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and fill values:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
   ```

3. Apply local migrations (from project root):

   ```bash
   supabase db push
   ```

   Migration files are in `supabase/migrations`.

4. Start the app:

   ```bash
   npm run start
   ```

   For web:

   ```bash
   npm run web
   ```

## Database

The migration creates:

- `public.bookmarks` table (`url`, `description`, ownership, timestamps)
- Trigger to auto-update `updated_at`
- Row Level Security (RLS) with policies so users can only read/write their own bookmarks
