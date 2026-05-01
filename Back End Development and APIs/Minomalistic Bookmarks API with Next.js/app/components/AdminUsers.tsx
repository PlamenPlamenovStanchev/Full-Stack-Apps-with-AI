'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
}

export function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', isAdmin: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadUsers();
  }, [token]);

  const loadUsers = async () => {
    if (!token) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load users');

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
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
        ? `/api/admin/users/${editingId}`
        : '/api/admin/users';

      const body = editingId
        ? { email: formData.email, isAdmin: formData.isAdmin }
        : { email: formData.email, password: formData.password, isAdmin: formData.isAdmin };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save user');
      }

      setFormData({ email: '', password: '', isAdmin: false });
      setEditingId(null);
      setShowAddForm(false);
      await loadUsers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({ email: user.email, password: '', isAdmin: user.isAdmin || false });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user and all their bookmarks?')) return;

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ email: '', password: '', isAdmin: false });
    setFormError('');
  };

  return (
    <div>
      {/* Add/Edit Form */}
      <div style={styles.formSection}>
        {!showAddForm ? (
          <button onClick={() => setShowAddForm(true)} style={styles.addButton}>
            + Add User
          </button>
        ) : (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>
              {editingId ? 'Edit User' : 'Add New User'}
            </h3>
            {formError && <div style={styles.error}>{formError}</div>}
            <form onSubmit={handleAddOrUpdate} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  required
                  style={styles.input}
                  disabled={isSubmitting}
                />
              </div>
              {!editingId && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required={!editingId}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>
              )}
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isAdmin}
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                    disabled={isSubmitting}
                  />
                  Admin User
                </label>
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

      {/* Users List */}
      <div style={styles.listSection}>
        {error && <div style={styles.error}>{error}</div>}

        {isLoading ? (
          <div style={styles.loading}>Loading users...</div>
        ) : users.length === 0 ? (
          <div style={styles.empty}>No users found.</div>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div style={{ flex: 1 }}>Email</div>
              <div style={{ flex: 0.3 }}>Admin</div>
              <div style={{ flex: 0.4 }}>Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.id} style={styles.tableRow}>
                <div style={{ flex: 1 }}>{user.email}</div>
                <div style={{ flex: 0.3 }}>
                  {user.isAdmin ? (
                    <span style={{ backgroundColor: '#d0f0ff', color: '#0070f3', padding: '0.25rem 0.5rem', borderRadius: '3px', fontSize: '0.85rem' }}>
                      Admin
                    </span>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>User</span>
                  )}
                </div>
                <div style={{ flex: 0.4, display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(user)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
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
    alignItems: 'center',
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
};
