'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { AdminBookmarks } from '@/app/components/AdminBookmarks';
import { AdminUsers } from '@/app/components/AdminUsers';

export default function AdminPage() {
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'users'>('bookmarks');

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#c33', margin: '0 0 1rem 0' }}>Access Denied</h2>
          <p style={{ color: '#666', margin: '0 0 1.5rem 0' }}>You do not have permission to access the admin panel.</p>
          <a href="/dashboard" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: '500' }}>
            ← Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🛡️ Admin Panel</h1>
          <p style={styles.subtitle}>Manage bookmarks and users</p>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('bookmarks')}
          style={{
            ...styles.tab,
            ...(activeTab === 'bookmarks' ? styles.tabActive : styles.tabInactive),
          }}
        >
          📚 Manage Bookmarks
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            ...styles.tab,
            ...(activeTab === 'users' ? styles.tabActive : styles.tabInactive),
          }}
        >
          👥 Manage Users
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.content}>
        {activeTab === 'bookmarks' && <AdminBookmarks />}
        {activeTab === 'users' && <AdminUsers />}
      </div>

      {/* Navigation Links */}
      <div style={styles.footer}>
        <a href="/dashboard" style={styles.link}>
          ← Back to Dashboard
        </a>
        <span style={{ color: '#ddd' }}>|</span>
        <a href="/" style={styles.link}>
          🏠 Home
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #eee',
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
  } as React.CSSProperties,
  subtitle: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.95rem',
    color: '#666',
  } as React.CSSProperties,
  logoutButton: {
    padding: '0.55rem 1rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    borderBottom: '2px solid #eee',
  } as React.CSSProperties,
  tab: {
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderBottom: '3px solid transparent',
  } as React.CSSProperties,
  tabActive: {
    color: '#0070f3',
    borderBottomColor: '#0070f3',
  } as React.CSSProperties,
  tabInactive: {
    color: '#666',
    borderBottomColor: 'transparent',
  } as React.CSSProperties,
  content: {
    marginBottom: '2rem',
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1.5rem',
    borderTop: '1px solid #eee',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: '500',
  } as React.CSSProperties,
};
