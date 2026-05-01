# 📚 Minimalistic Bookmarks API

A clean, RESTful bookmarks API built with **Next.js** and **TypeScript**. Store, manage, and organize your bookmarks with JWT-based authentication and JSON file persistence.

## ✨ Features

- ✅ **User Authentication** - Register, login, and session management with JWT
- ✅ **CRUD Operations** - Create, read, update, and delete bookmarks
- ✅ **Pagination** - Efficiently handle large collections of bookmarks
- ✅ **Data Isolation** - Each user can only access their own bookmarks
- ✅ **Password Security** - Passwords hashed with bcryptjs
- ✅ **JSON Persistence** - Simple, file-based data storage
- ✅ **TypeScript** - Full type safety throughout
- ✅ **API Documentation** - Interactive home page with endpoint examples

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone/navigate to the project directory**
   ```bash
   cd "Minomalistic Bookmarks API with Next.js"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate sample data**
   ```bash
   node scripts/seed.js
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the API documentation.

## 📖 API Endpoints

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": { "id": "user_xxx", "email": "newuser@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": { "id": "user_1", "email": "john@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": { "id": "user_1", "email": "john@example.com" }
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logout successful. Please delete the token on the client side."
}
```

### Bookmark Endpoints

All bookmark endpoints require `Authorization: Bearer {token}` header.

#### List Bookmarks (with Pagination)
```
GET /api/bookmarks?page=1&pageSize=10
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "bookmarks": [
    {
      "id": "bookmark_1",
      "userId": "user_1",
      "url": "https://nextjs.org",
      "description": "Next.js official documentation",
      "dateCreated": "2026-04-26T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 12,
    "totalPages": 2
  }
}
```

#### Create Bookmark
```
POST /api/bookmarks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://example.com",
  "description": "Optional description"
}
```

**Response (201):**
```json
{
  "message": "Bookmark created successfully",
  "bookmark": {
    "id": "bookmark_xxx",
    "userId": "user_1",
    "url": "https://example.com",
    "description": "Optional description",
    "dateCreated": "2026-05-01T12:00:00.000Z"
  }
}
```

#### Get Single Bookmark
```
GET /api/bookmarks/{id}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "bookmark": {
    "id": "bookmark_1",
    "userId": "user_1",
    "url": "https://nextjs.org",
    "description": "Next.js official documentation",
    "dateCreated": "2026-04-26T10:30:00.000Z"
  }
}
```

#### Update Bookmark
```
PUT /api/bookmarks/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://nextjs.org/docs",
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "message": "Bookmark updated successfully",
  "bookmark": {
    "id": "bookmark_1",
    "userId": "user_1",
    "url": "https://nextjs.org/docs",
    "description": "Updated description",
    "dateCreated": "2026-04-26T10:30:00.000Z"
  }
}
```

#### Delete Bookmark
```
DELETE /api/bookmarks/{id}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Bookmark deleted successfully"
}
```

## 📊 Data Structure

All data is stored in `data.json` at the root of the project:

```json
{
  "users": [
    {
      "id": "user_1",
      "email": "john@example.com",
      "password": "hashed_password_here"
    }
  ],
  "bookmarks": [
    {
      "id": "bookmark_1",
      "userId": "user_1",
      "url": "https://nextjs.org",
      "description": "Next.js official documentation",
      "dateCreated": "2026-04-26T10:30:00.000Z"
    }
  ]
}
```

## 🔑 Sample Credentials

The seed script creates two sample users:

| Email | Password | Bookmarks |
|-------|----------|-----------|
| john@example.com | password123 | 12 bookmarks |
| jane@example.com | securepass456 | 4 bookmarks |

To regenerate sample data, delete `data.json` and run `node scripts/seed.js` again.

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
- **JWT Authentication**: Tokens expire after 24 hours
- **Data Isolation**: Users can only access their own bookmarks
- **URL Validation**: All URLs are validated before storage
- **Environment Secrets**: JWT secret stored in `.env.local`

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── logout/route.ts
│   │   └── bookmarks/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── jwt.ts
│   ├── password.ts
│   ├── data.ts
│   └── generateSampleData.ts
├── scripts/
│   └── seed.js
├── data.json
├── .env.local
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Generate sample data
node scripts/seed.js
```

## 💡 Usage Example

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Create a bookmark
```bash
curl -X POST http://localhost:3000/api/bookmarks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "description": "My bookmark"}'
```

### List bookmarks with pagination
```bash
curl http://localhost:3000/api/bookmarks?page=1&pageSize=5 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📈 Pagination

The bookmarks list endpoint supports pagination:

- **page** (default: 1) - Page number (starts at 1)
- **pageSize** (default: 10, max: 100) - Number of bookmarks per page

Example: `/api/bookmarks?page=2&pageSize=5` returns bookmarks 6-10.

## 🐛 Troubleshooting

### "Bookmark not found" error
- Ensure you're using the correct token with an active session
- Verify the bookmark ID is correct
- Check that the bookmark belongs to the authenticated user

### "Invalid URL format" error
- The URL must be a valid, properly formatted URL
- Example valid URLs: `https://example.com`, `http://site.org/page`

### "Authorization token is missing" error
- Add the `Authorization: Bearer {token}` header to your request
- Ensure the token hasn't expired (tokens expire after 24 hours)

## 📝 Notes

- This is a demonstration/learning project. For production use, consider:
  - Using a proper database instead of JSON files
  - Adding rate limiting
  - Adding input validation and sanitization
  - Implementing refresh tokens
  - Adding HTTPS enforcement
  - Adding CORS configuration

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to fork and customize this project for your needs!
