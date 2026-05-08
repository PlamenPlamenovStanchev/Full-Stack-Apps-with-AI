# Movie Catalog App - Drizzle ORM Setup

Full-stack movie catalog application with Drizzle ORM and PostgreSQL.

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database connection:**
   - Copy `.env.example` to `.env`
   - Set your `DATABASE_URL` (use your Neon PostgreSQL connection string)

   For Neon:
   ```env
   DATABASE_URL=postgresql://neondb_owner:password@c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

## Database Commands

- **Generate migrations** (after schema changes):
  ```bash
  npm run db:generate
  ```

- **Push migrations to database:**
  ```bash
  npm run db:push
  ```

- **Open Drizzle Studio** (visual database manager):
  ```bash
  npm run db:studio
  ```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Database Schema

The schema includes:
- **movies** - Movie catalog entries
- **users** - User accounts
- **reviews** - User reviews for movies

See [`src/db/schema.ts`](src/db/schema.ts) for the full schema definition.
