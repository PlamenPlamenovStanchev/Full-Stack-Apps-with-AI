import React from 'react';

export default function DocsHome() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>📚 Bookmarks API - Documentation</h1>
      <p>A minimalistic bookmarks API built with Next.js and TypeScript.</p>

      <section>
        <h2>🚀 Quick Start</h2>
        <p>Install dependencies:</p>
        <pre style={codeStyle}>npm install</pre>
        <p>Run the development server:</p>
        <pre style={codeStyle}>npm run dev</pre>
        <p>The API will be available at <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>http://localhost:3000</code></p>
      </section>

      <section>
        <h2>🔐 Authentication</h2>
        <p>All bookmark endpoints require JWT authentication.</p>

        <h3>Register</h3>
        <CodeBlock
          method="POST"
          endpoint="/api/auth/register"
          body={{ email: 'user@example.com', password: 'password123' }}
          response={{
            message: 'User registered successfully',
            user: { id: 'user_xxx', email: 'user@example.com' },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          }}
        />

        <h3>Login</h3>
        <CodeBlock
          method="POST"
          endpoint="/api/auth/login"
          body={{ email: 'john@example.com', password: 'password123' }}
          response={{
            message: 'Login successful',
            user: { id: 'user_1', email: 'john@example.com' },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          }}
        />

        <h3>Get Current User</h3>
        <CodeBlock
          method="GET"
          endpoint="/api/auth/me"
          headers={{ Authorization: 'Bearer {token}' }}
          response={{
            user: { id: 'user_1', email: 'john@example.com' },
          }}
        />

        <h3>Logout</h3>
        <CodeBlock
          method="POST"
          endpoint="/api/auth/logout"
          headers={{ Authorization: 'Bearer {token}' }}
          response={{
            message: 'Logout successful. Please delete the token on the client side.',
          }}
        />
      </section>

      <section>
        <h2>🔖 Bookmarks Endpoints</h2>
        <p>All endpoints require <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>Authorization: Bearer {'{token}'}</code> header.</p>

        <h3>Get All Bookmarks (with Paging)</h3>
        <CodeBlock
          method="GET"
          endpoint="/api/bookmarks?page=1&pageSize=10"
          headers={{ Authorization: 'Bearer {token}' }}
          response={{
            bookmarks: [
              {
                id: 'bookmark_1',
                userId: 'user_1',
                url: 'https://nextjs.org',
                description: 'Next.js official documentation',
                dateCreated: '2026-04-26T10:30:00.000Z',
              },
            ],
            pagination: {
              page: 1,
              pageSize: 10,
              total: 12,
              totalPages: 2,
            },
          }}
        />

        <h3>Create Bookmark</h3>
        <CodeBlock
          method="POST"
          endpoint="/api/bookmarks"
          headers={{ Authorization: 'Bearer {token}' }}
          body={{
            url: 'https://example.com',
            description: 'Optional description',
          }}
          response={{
            message: 'Bookmark created successfully',
            bookmark: {
              id: 'bookmark_xxx',
              userId: 'user_1',
              url: 'https://example.com',
              description: 'Optional description',
              dateCreated: '2026-05-01T12:00:00.000Z',
            },
          }}
        />

        <h3>Get Single Bookmark</h3>
        <CodeBlock
          method="GET"
          endpoint="/api/bookmarks/bookmark_1"
          headers={{ Authorization: 'Bearer {token}' }}
          response={{
            bookmark: {
              id: 'bookmark_1',
              userId: 'user_1',
              url: 'https://nextjs.org',
              description: 'Next.js official documentation',
              dateCreated: '2026-04-26T10:30:00.000Z',
            },
          }}
        />

        <h3>Update Bookmark</h3>
        <CodeBlock
          method="PUT"
          endpoint="/api/bookmarks/bookmark_1"
          headers={{ Authorization: 'Bearer {token}' }}
          body={{
            url: 'https://nextjs.org/docs',
            description: 'Updated description',
          }}
          response={{
            message: 'Bookmark updated successfully',
            bookmark: {
              id: 'bookmark_1',
              userId: 'user_1',
              url: 'https://nextjs.org/docs',
              description: 'Updated description',
              dateCreated: '2026-04-26T10:30:00.000Z',
            },
          }}
        />

        <h3>Delete Bookmark</h3>
        <CodeBlock
          method="DELETE"
          endpoint="/api/bookmarks/bookmark_1"
          headers={{ Authorization: 'Bearer {token}' }}
          response={{
            message: 'Bookmark deleted successfully',
          }}
        />
      </section>

      <section>
        <h2>�️ Admin Endpoints</h2>
        <p>Admin endpoints allow authorized administrators to manage all users and bookmarks. All admin endpoints require valid JWT token with <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>isAdmin: true</code>.</p>

        <h3>Register Admin User</h3>
        <p><strong>⚠️ Requires admin secret key</strong> - This endpoint creates a new admin account and requires the <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>ADMIN_SECRET</code> from <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>.env.local</code></p>
        <CodeBlock
          method="POST"
          endpoint="/api/auth/register-admin"
          body={{
            email: 'admin@example.com',
            password: 'adminpass123',
            adminSecret: 'your-admin-registration-secret-key-12345',
          }}
          response={{
            message: 'Admin user created successfully',
            user: {
              id: 'user_xxx',
              email: 'admin@example.com',
              isAdmin: true,
            },
          }}
        />

        <h3>Get All Bookmarks (Admin)</h3>
        <p>Retrieve all bookmarks across all users with pagination.</p>
        <CodeBlock
          method="GET"
          endpoint="/api/admin/bookmarks?page=1&pageSize=10"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          response={{
            bookmarks: [
              {
                id: 'bookmark_1',
                userId: 'user_1',
                url: 'https://nextjs.org',
                description: 'Next.js official documentation',
                dateCreated: '2026-04-26T10:30:00.000Z',
              },
            ],
            pagination: {
              page: 1,
              pageSize: 10,
              total: 16,
              totalPages: 2,
            },
          }}
        />

        <h3>Create Bookmark (Admin)</h3>
        <p>Admin can create bookmarks for any user.</p>
        <CodeBlock
          method="POST"
          endpoint="/api/admin/bookmarks"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          body={{
            userId: 'user_2',
            url: 'https://example.com',
            description: 'Created by admin for user_2',
          }}
          response={{
            message: 'Bookmark created successfully',
            bookmark: {
              id: 'bookmark_xxx',
              userId: 'user_2',
              url: 'https://example.com',
              description: 'Created by admin for user_2',
              dateCreated: '2026-05-01T12:00:00.000Z',
            },
          }}
        />

        <h3>Update Any Bookmark (Admin)</h3>
        <p>Admin can update any bookmark regardless of owner.</p>
        <CodeBlock
          method="PUT"
          endpoint="/api/admin/bookmarks/bookmark_1"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          body={{
            url: 'https://updated-url.com',
            description: 'Updated by admin',
          }}
          response={{
            message: 'Bookmark updated successfully',
            bookmark: {
              id: 'bookmark_1',
              userId: 'user_1',
              url: 'https://updated-url.com',
              description: 'Updated by admin',
              dateCreated: '2026-04-26T10:30:00.000Z',
            },
          }}
        />

        <h3>Delete Any Bookmark (Admin)</h3>
        <p>Admin can delete any bookmark.</p>
        <CodeBlock
          method="DELETE"
          endpoint="/api/admin/bookmarks/bookmark_1"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          response={{
            message: 'Bookmark deleted successfully',
          }}
        />

        <h3>Get All Users (Admin)</h3>
        <p>Retrieve all users in the system (passwords are never exposed).</p>
        <CodeBlock
          method="GET"
          endpoint="/api/admin/users"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          response={{
            users: [
              {
                id: 'user_1',
                email: 'john@example.com',
                isAdmin: true,
              },
              {
                id: 'user_2',
                email: 'jane@example.com',
                isAdmin: false,
              },
            ],
          }}
        />

        <h3>Create User (Admin)</h3>
        <p>Admin can create new user accounts.</p>
        <CodeBlock
          method="POST"
          endpoint="/api/admin/users"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          body={{
            email: 'newuser@example.com',
            password: 'password123',
            isAdmin: false,
          }}
          response={{
            message: 'User created successfully',
            user: {
              id: 'user_xxx',
              email: 'newuser@example.com',
              isAdmin: false,
            },
          }}
        />

        <h3>Update User (Admin)</h3>
        <p>Admin can update user properties including admin status.</p>
        <CodeBlock
          method="PUT"
          endpoint="/api/admin/users/user_2"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          body={{
            email: 'jane.updated@example.com',
            isAdmin: true,
          }}
          response={{
            message: 'User updated successfully',
            user: {
              id: 'user_2',
              email: 'jane.updated@example.com',
              isAdmin: true,
            },
          }}
        />

        <h3>Delete User (Admin)</h3>
        <p><strong>⚠️ Warning:</strong> Deleting a user will cascade delete all their bookmarks.</p>
        <CodeBlock
          method="DELETE"
          endpoint="/api/admin/users/user_2"
          headers={{ Authorization: 'Bearer {admin_token}' }}
          response={{
            message: 'User and all associated bookmarks deleted successfully',
          }}
        />
      </section>

      <section>
        <h2>�📖 Sample Data</h2>
        <p>The API comes with pre-loaded sample data:</p>
        <ul>
          <li><strong>User 1 (Admin):</strong> john@example.com / password123 - 👑 Has admin privileges</li>
          <li><strong>User 2 (Regular):</strong> jane@example.com / securepass456 - Regular user</li>
        </ul>
        <p>To reset to sample data, delete the <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>data.json</code> file and restart the server.</p>
      </section>

      <section>
        <h2>💾 Data Storage</h2>
        <p>All data is stored in a simple JSON file (<code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px' }}>data.json</code>) at the project root.</p>
        <p><strong>Data structure:</strong></p>
        <pre style={codeStyle}>{`{
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
}`}</pre>
      </section>

      <section>
        <h2>🔒 Security</h2>
        <ul>
          <li>Passwords are hashed using bcryptjs with 10 salt rounds</li>
          <li>JWTs expire after 24 hours</li>
          <li>Users can only access their own bookmarks</li>
          <li>Admin users have elevated permissions for system management</li>
          <li>Admin registration requires secret key validation (ADMIN_SECRET from .env.local)</li>
          <li>Admin operations are isolated on separate API routes (/api/admin/*)</li>
          <li>URL validation is performed on bookmark creation/update</li>
        </ul>
      </section>

      <section>
        <h2>📝 Features</h2>
        <ul>
          <li>✅ JWT-based authentication</li>
          <li>✅ User registration and login</li>
          <li>✅ Full CRUD operations for bookmarks</li>
          <li>✅ Pagination support (configurable page size)</li>
          <li>✅ Data isolation per user</li>
          <li>✅ Admin panel with tabbed interface</li>
          <li>✅ Admin user management (create, update, delete)</li>
          <li>✅ Admin bookmark management across all users</li>
          <li>✅ Admin registration with secret key validation</li>
          <li>✅ Role-based access control (user vs admin)</li>
          <li>✅ JSON-based persistence</li>
          <li>✅ TypeScript support</li>
          <li>✅ Password encryption</li>
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee', color: '#666', fontSize: '0.9rem' }}>
        <p>Built with Next.js 15, TypeScript, and ❤️</p>
        <p><a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Bookmarks App</a></p>
      </footer>
    </main>
  );
}

function CodeBlock({
  method,
  endpoint,
  headers,
  body,
  response,
}: {
  method: string;
  endpoint: string;
  headers?: Record<string, string>;
  body?: object;
  response: object;
}) {
  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
      <div style={{ marginBottom: '1rem' }}>
        <strong style={{
          display: 'inline-block',
          padding: '0.25rem 0.5rem',
          backgroundColor: getMethodColor(method),
          color: 'white',
          borderRadius: '3px',
          marginRight: '0.5rem',
        }}>
          {method}
        </strong>
        <code style={{ backgroundColor: '#e0e0e0', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>{endpoint}</code>
      </div>

      {headers && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Headers:</strong>
          <pre style={codeStyle}>{JSON.stringify(headers, null, 2)}</pre>
        </div>
      )}

      {body && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Body:</strong>
          <pre style={codeStyle}>{JSON.stringify(body, null, 2)}</pre>
        </div>
      )}

      <div>
        <strong>Response:</strong>
        <pre style={codeStyle}>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

function getMethodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: '#61affe',
    POST: '#49cc90',
    PUT: '#fca130',
    DELETE: '#f93e3e',
  };
  return colors[method] || '#999';
}

const codeStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  padding: '1rem',
  borderRadius: '4px',
  overflowX: 'auto',
  fontSize: '0.85rem',
  border: '1px solid #ddd',
};
