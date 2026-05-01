import React from 'react';

export default function DocsHome() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>📚 Bookmarks API & Client</h1>
      <p>A minimalistic bookmarks application built with Next.js and TypeScript.</p>

      <section style={{ padding: '1.5rem', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '2px solid #0070f3', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, color: '#0070f3' }}>🚀 Getting Started</h2>
        <p><strong>Choose one of the options below:</strong></p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
          <li>
            <a href="/dashboard" style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'none' }}>
              → Open Bookmarks Client App
            </a>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Sign up, login, and manage your bookmarks with a beautiful UI
            </p>
          </li>
          <li style={{ marginTop: '1rem' }}>
            <a href="/docs" style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'none' }}>
              → View API Documentation
            </a>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Learn about the REST API endpoints and how to integrate with them
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>✨ Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>🔐 Authentication</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>JWT-based user registration and login with password encryption</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>📚 Bookmark Management</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>Full CRUD operations for creating, reading, updating, and deleting bookmarks</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>📄 Pagination</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>Efficiently handle large collections with configurable page sizes</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>🔒 Data Isolation</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>Each user can only access and manage their own bookmarks</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>💾 Simple Storage</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>JSON file-based persistence, no external database required</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, color: '#0070f3' }}>⚡ TypeScript</h3>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>Full type safety for better development experience</p>
          </div>
        </div>
      </section>

      <section>
        <h2>🔄 Architecture</h2>
        <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '6px', border: '1px solid #ddd' }}>
          <p><strong>Backend:</strong> Next.js API Routes with TypeScript</p>
          <ul>
            <li>Authentication endpoints (register, login, me, logout)</li>
            <li>Bookmark CRUD endpoints with pagination</li>
            <li>JWT token verification middleware</li>
            <li>Password hashing with bcryptjs</li>
          </ul>
          
          <p><strong>Frontend:</strong> React Client Components</p>
          <ul>
            <li>AuthContext for state management</li>
            <li>Login/Register form with validation</li>
            <li>Bookmarks list view with pagination</li>
            <li>Add, edit, and delete bookmark functionality</li>
          </ul>
          
          <p><strong>Data:</strong> JSON File Storage</p>
          <ul>
            <li>User data (email, hashed password)</li>
            <li>Bookmark data with metadata</li>
            <li>Pre-loaded sample data for testing</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>📝 Sample Credentials</h2>
        <p>Test the app with these pre-configured accounts:</p>
        <div style={{ backgroundColor: '#f0f8ff', padding: '1rem', borderRadius: '6px', border: '1px solid #0070f3', marginBottom: '1rem' }}>
          <p><strong>Account 1:</strong></p>
          <p>📧 <code style={{ backgroundColor: '#fff', padding: '2px 6px' }}>john@example.com</code></p>
          <p>🔐 <code style={{ backgroundColor: '#fff', padding: '2px 6px' }}>password123</code></p>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0 0 0' }}>Has 12 sample bookmarks</p>
        </div>
        <div style={{ backgroundColor: '#f0f8ff', padding: '1rem', borderRadius: '6px', border: '1px solid #0070f3' }}>
          <p><strong>Account 2:</strong></p>
          <p>📧 <code style={{ backgroundColor: '#fff', padding: '2px 6px' }}>jane@example.com</code></p>
          <p>🔐 <code style={{ backgroundColor: '#fff', padding: '2px 6px' }}>securepass456</code></p>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0 0 0' }}>Has 4 sample bookmarks</p>
        </div>
      </section>

      <section>
        <h2>🛠 Technology Stack</h2>
        <ul>
          <li><strong>Framework:</strong> Next.js 15</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Authentication:</strong> JWT (jsonwebtoken)</li>
          <li><strong>Password Security:</strong> bcryptjs</li>
          <li><strong>UI:</strong> React with inline styles</li>
          <li><strong>Storage:</strong> JSON files</li>
        </ul>
      </section>

      <section>
        <h2>💡 Use Cases</h2>
        <ul>
          <li>Learning full-stack development with Next.js</li>
          <li>Understanding JWT authentication</li>
          <li>Building React client applications</li>
          <li>Creating REST APIs with TypeScript</li>
          <li>Implementing pagination and data management</li>
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee', color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
        <p>Built with Next.js, TypeScript, and React ❤️</p>
        <p>Minimalistic design for learning and demonstration</p>
      </footer>
    </main>
  );
}

