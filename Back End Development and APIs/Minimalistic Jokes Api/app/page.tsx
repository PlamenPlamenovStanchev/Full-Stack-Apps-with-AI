'use client';

import { useState } from 'react';

export default function Home() {
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';

  const endpoints = [
    {
      method: 'GET',
      path: '/api/jokes',
      description: 'Get all jokes',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes`,
      response: '[{ id: 1, title: "...", text: "...", publishDate: "..." }, ...]',
    },
    {
      method: 'POST',
      path: '/api/jokes',
      description: 'Publish a new joke',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes`,
      requestBody: '{ "title": "Joke Title", "text": "Joke text here" }',
      response: '{ id: 6, title: "...", text: "...", publishDate: "..." }',
    },
    {
      method: 'GET',
      path: '/api/jokes/random',
      description: 'Get a random joke',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes/random`,
      response: '{ id: 3, title: "...", text: "...", publishDate: "..." }',
    },
    {
      method: 'GET',
      path: '/api/jokes/latest?limit=3',
      description: 'Get latest N jokes (default limit is 5)',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes/latest?limit=3`,
      response: '[{ id: 5, title: "...", text: "...", publishDate: "..." }, ...]',
    },
    {
      method: 'GET',
      path: '/api/jokes/:id',
      description: 'Get a specific joke by ID',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes/1`,
      response: '{ id: 1, title: "...", text: "...", publishDate: "..." }',
    },
    {
      method: 'PUT',
      path: '/api/jokes/:id',
      description: 'Edit a joke',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes/1`,
      requestBody: '{ "title": "Updated Title", "text": "Updated text" }',
      response: '{ id: 1, title: "...", text: "...", publishDate: "..." }',
    },
    {
      method: 'DELETE',
      path: '/api/jokes/:id',
      description: 'Delete a joke',
      example: `${baseUrl || 'http://localhost:3000'}/api/jokes/1`,
      response: '{ message: "Joke deleted successfully" }',
    },
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6 }}>
      <nav style={{ backgroundColor: '#f5f5f5', padding: '20px', borderBottom: '1px solid #ddd' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 10px 0' }}>🎭 Minimalistic Jokes API</h1>
          <p style={{ margin: '0', color: '#666' }}>Simple joke management API built with Next.js</p>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2>📚 API Documentation</h2>
          <p>This API provides endpoints to manage jokes. All jokes include an ID, title, text, and publish date.</p>

          <div style={{ display: 'grid', gap: '20px' }}>
            {endpoints.map((endpoint, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: selectedEndpoint === idx ? '#f0f7ff' : 'white',
                }}
                onClick={() => setSelectedEndpoint(selectedEndpoint === idx ? null : idx)}
              >
                <div
                  style={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: selectedEndpoint === idx ? '#e6f2ff' : '#f9f9f9',
                  }}
                >
                  <span
                    style={{
                      backgroundColor:
                        endpoint.method === 'GET'
                          ? '#23b14d'
                          : endpoint.method === 'POST'
                          ? '#0066cc'
                          : endpoint.method === 'PUT'
                          ? '#ff9900'
                          : '#e74c3c',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      minWidth: '50px',
                      textAlign: 'center',
                    }}
                  >
                    {endpoint.method}
                  </span>
                  <span style={{ fontFamily: 'monospace', flex: 1 }}>{endpoint.path}</span>
                  <span style={{ color: '#666', fontSize: '12px' }}>{endpoint.description}</span>
                </div>

                {selectedEndpoint === idx && (
                  <div style={{ padding: '16px', borderTop: '1px solid #ddd', backgroundColor: '#fafafa' }}>
                    <p style={{ marginTop: 0 }}>
                      <strong>Description:</strong> {endpoint.description}
                    </p>
                    {endpoint.requestBody && (
                      <div style={{ marginBottom: '12px' }}>
                        <strong>Request Body:</strong>
                        <pre
                          style={{
                            backgroundColor: '#fff',
                            padding: '10px',
                            borderRadius: '4px',
                            overflow: 'auto',
                            border: '1px solid #ddd',
                          }}
                        >
                          {endpoint.requestBody}
                        </pre>
                      </div>
                    )}
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Example:</strong>
                      <pre
                        style={{
                          backgroundColor: '#fff',
                          padding: '10px',
                          borderRadius: '4px',
                          overflow: 'auto',
                          border: '1px solid #ddd',
                        }}
                      >
                        {endpoint.example}
                      </pre>
                    </div>
                    <div>
                      <strong>Response:</strong>
                      <pre
                        style={{
                          backgroundColor: '#fff',
                          padding: '10px',
                          borderRadius: '4px',
                          overflow: 'auto',
                          border: '1px solid #ddd',
                        }}
                      >
                        {endpoint.response}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px', backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '8px' }}>
          <h3>💾 Data Structure</h3>
          <p>Each joke has the following structure:</p>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #bbb',
            }}
          >
            {`{
  "id": 1,
  "title": "The Programming Life",
  "text": "Why do programmers prefer dark mode? Because light attracts bugs!",
  "publishDate": "2024-01-15T10:30:00Z"
}`}
          </pre>
        </section>

        <section style={{ backgroundColor: '#fff9e6', padding: '20px', borderRadius: '8px' }}>
          <h3>ℹ️ Notes</h3>
          <ul>
            <li>All data is persisted in a simple JSON file</li>
            <li>No authentication is required</li>
            <li>Each joke automatically receives a unique ID on creation</li>
            <li>Publish dates are automatically set to the current timestamp</li>
            <li>Latest jokes are sorted by publish date in descending order</li>
          </ul>
        </section>
      </main>

      <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>© 2024 Minimalistic Jokes API | Built with Next.js</p>
      </footer>
    </div>
  );
}
