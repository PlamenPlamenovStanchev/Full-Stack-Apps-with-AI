'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface Bookmark {
  id: string;
  userId: string;
  url: string;
  description?: string;
  dateCreated: string;
}

interface User {
  id: string;
  email: string;
}

export function AdminBookmarks() {
  const { token } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ userId: '', url: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadBookmarks();
    loadUsers();
  }, [page, pageSize, token]);

  const loadBookmarks = async () => {
    if (!token) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/bookmarks?page=${page}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load bookmarks');

      const data = await response.json();
      setBookmarks(data.bookmarks);
      setTotal(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookmarks');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load users');

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/admin/bookmarks/${editingId}`
        : '/api/admin/bookmarks';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save bookmark');
      }

      setFormData({ userId: '', url: '', description: '' });
      setEditingId(null);
      setShowAddForm(false);
      await loadBookmarks();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save bookmark');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (bookmark: Bookmark) => {
    setEditingId(bookmark.id);
    setFormData({ userId: bookmark.userId, url: bookmark.url, description: bookmark.description || '' });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this bookmark?')) return;

    try {
      const response = await fetch(`/api/admin/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete bookmark');

      await loadBookmarks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bookmark');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ userId: '', url: '', description: '' });
    setFormError('');
  };

  return (
    <div>
      {/* Add/Edit Form */}
      <div style={styles.formSection}>
        {!showAddForm ? (
          <button onClick={() => setShowAddForm(true)} style={styles.addButton}>
            + Add Bookmark
          </button>
        ) : (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>
              {editingId ? 'Edit Bookmark' : 'Add New Bookmark'}
            </h3>
            {formError && <div style={styles.error}>{formError}</div>}
            <form onSubmit={handleAddOrUpdate} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>User *</label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  required
                  style={styles.input}
                  disabled={isSubmitting}
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  required
                  style={styles.input}
                  disabled={isSubmitting}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional"
                  style={styles.input}
                  disabled={isSubmitting}
                />
              </div>
              <div style={styles.formButtons}>
                <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={handleCancel} style={styles.cancelButton} disabled={isSubmitting}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      <div style={styles.listSection}>
        {error && <div style={styles.error}>{error}</div>}

        {isLoading ? (
          <div style={styles.loading}>Loading bookmarks...</div>
        ) : bookmarks.length === 0 ? (
          <div style={styles.empty}>No bookmarks found.</div>
        ) : (
          <>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div style={{ flex: 1 }}>URL</div>
                <div style={{ flex: 0.5 }}>User</div>
                <div style={{ flex: 0.5 }}>Actions</div>
              </div>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} style={styles.tableRow}>
                  <div style={{ flex: 1, wordBreak: 'break-word' }}>
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                      {bookmark.url}
                    </a>
                    {bookmark.description && <p style={styles.description}>{bookmark.description}</p>}
                  </div>
                  <div style={{ flex: 0.5, fontSize: '0.9rem' }}>
                    {users.find((u) => u.id === bookmark.userId)?.email || 'Unknown'}
                  </div>
                  <div style={{ flex: 0.5, display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(bookmark)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(bookmark.id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  style={styles.paginationButton}
                >
                  ← Previous
                </button>
                <span style={styles.paginationInfo}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  style={styles.paginationButton}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  formSection: { marginBottom: '2rem' } as React.CSSProperties,
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  formCard: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #eee',
  } as React.CSSProperties,
  formTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  } as React.CSSProperties,
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  } as React.CSSProperties,
  label: {
    fontWeight: '500',
    color: '#333',
    fontSize: '0.95rem',
  } as React.CSSProperties,
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  formButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  } as React.CSSProperties,
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  listSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    border: '1px solid #eee',
  } as React.CSSProperties,
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #fcc',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#666',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#999',
  } as React.CSSProperties,
  table: {
    border: '1px solid #eee',
    borderRadius: '6px',
    overflow: 'hidden',
  } as React.CSSProperties,
  tableHeader: {
    display: 'flex',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    fontWeight: '600',
    borderBottom: '1px solid #eee',
    gap: '1rem',
  } as React.CSSProperties,
  tableRow: {
    display: 'flex',
    padding: '1rem',
    borderBottom: '1px solid #eee',
    gap: '1rem',
    alignItems: 'flex-start',
  } as React.CSSProperties,
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  description: {
    margin: '0.5rem 0 0 0',
    color: '#666',
    fontSize: '0.85rem',
  } as React.CSSProperties,
  editButton: {
    padding: '0.4rem 0.75rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  } as React.CSSProperties,
  deleteButton: {
    padding: '0.4rem 0.75rem',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    color: '#c33',
    borderRadius: '4px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  } as React.CSSProperties,
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #eee',
  } as React.CSSProperties,
  paginationButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  paginationInfo: {
    fontSize: '0.9rem',
    color: '#666',
  } as React.CSSProperties,
};
