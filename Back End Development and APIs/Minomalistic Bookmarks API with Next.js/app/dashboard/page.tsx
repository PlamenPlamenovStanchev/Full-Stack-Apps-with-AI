'use client';

import React from 'react';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { AuthForm } from '@/app/components/AuthForm';
import { BookmarksView } from '@/app/components/BookmarksView';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'white' }}>
      {user ? <BookmarksView /> : <AuthForm />}
      
      {/* Navigation Links */}
      <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '600px', left: 'auto', right: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
          ← Back to Home
        </a>
        <span style={{ color: '#ddd' }}>|</span>
        <a href="/docs" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
          📖 API Docs
        </a>
      </div>
    </div>
  );
}

export default function ClientApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
