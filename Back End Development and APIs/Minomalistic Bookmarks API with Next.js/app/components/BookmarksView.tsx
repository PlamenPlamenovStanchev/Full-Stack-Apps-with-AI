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

export function BookmarksView() {
  const { user, token, logout } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ url: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Load bookmarks
  useEffect(() => {
    loadBookmarks();
  }, [page, pageSize, token]);

  const loadBookmarks = async () => {
    if (!token) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/bookmarks?page=${page}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to load bookmarks');
      }

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

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/bookmarks/${editingId}`
        : '/api/bookmarks';

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

      setFormData({ url: '', description: '' });
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
    setFormData({ url: bookmark.url, description: bookmark.description || '' });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) return;

    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete bookmark');
      }

      await loadBookmarks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bookmark');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ url: '', description: '' });
    setFormError('');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📚 My Bookmarks</h1>
          <p style={styles.subtitle}>Total: {total} bookmarks</p>
        </div>
        <div style={styles.headerActions}>
          {user?.isAdmin && (
            <a href="/admin" style={styles.adminLink}>
              🛡️ Admin Panel
            </a>
          )}
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div style={styles.formSection}>
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            style={styles.addButton}
          >
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
                  placeholder="Optional description"
                  style={styles.input}
                  disabled={isSubmitting}
                />
              </div>
              <div style={styles.formButtons}>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={styles.cancelButton}
                  disabled={isSubmitting}
                >
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
          <div style={styles.empty}>
            <p>No bookmarks yet.</p>
            <p>Click "Add Bookmark" to get started!</p>
          </div>
        ) : (
          <>
            <div style={styles.bookmarksList}>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} style={styles.bookmarkCard}>
                  <div style={styles.bookmarkContent}>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.bookmarkUrl}
                    >
                      {bookmark.url}
                    </a>
                    {bookmark.description && (
                      <p style={styles.bookmarkDescription}>{bookmark.description}</p>
                    )}
                    <p style={styles.bookmarkDate}>
                      Created: {new Date(bookmark.dateCreated).toLocaleString()}
                    </p>
                  </div>
                  <div style={styles.bookmarkActions}>
                    <button
                      onClick={() => handleEdit(bookmark)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      style={styles.deleteButton}
                    >
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

            {/* Page Size Control */}
            <div style={styles.pageSizeControl}>
              <label style={styles.pageSizeLabel}>Items per page: </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setPage(1);
                }}
                style={styles.pageSizeSelect}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
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
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  headerActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  } as React.CSSProperties,
  adminLink: {
    padding: '0.55rem 1rem',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#1a1a1a',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  formSection: {
    marginBottom: '2rem',
  } as React.CSSProperties,
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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
    color: '#1a1a1a',
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
    fontSize: '1rem',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#999',
  } as React.CSSProperties,
  bookmarksList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  } as React.CSSProperties,
  bookmarkCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1rem',
    backgroundColor: '#fafafa',
    borderRadius: '6px',
    border: '1px solid #eee',
    gap: '1rem',
  } as React.CSSProperties,
  bookmarkContent: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,
  bookmarkUrl: {
    display: 'block',
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: '600',
    wordBreak: 'break-word' as const,
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  bookmarkDescription: {
    margin: '0.5rem 0',
    color: '#333',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  bookmarkDate: {
    margin: '0.5rem 0 0 0',
    color: '#999',
    fontSize: '0.8rem',
  } as React.CSSProperties,
  bookmarkActions: {
    display: 'flex',
    gap: '0.5rem',
    flexShrink: 0,
  } as React.CSSProperties,
  editButton: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  deleteButton: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    color: '#c33',
    borderRadius: '4px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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
  pageSizeControl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#666',
  } as React.CSSProperties,
  pageSizeLabel: {
    fontWeight: '500',
  } as React.CSSProperties,
  pageSizeSelect: {
    padding: '0.4rem 0.6rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  } as React.CSSProperties,
};
