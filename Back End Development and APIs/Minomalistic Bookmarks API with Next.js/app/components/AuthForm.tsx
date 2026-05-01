'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={styles.input}
              disabled={isSubmitting}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div style={styles.divider}>or</div>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setEmail('');
            setPassword('');
          }}
          style={styles.toggleButton}
          disabled={isSubmitting}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>

        {isLogin && (
          <div style={styles.demoInfo}>
            <p style={styles.demoTitle}>Demo Credentials:</p>
            <p style={styles.demoText}>📧 john@example.com</p>
            <p style={styles.demoText}>🔐 password123</p>
            <p style={styles.demoTextSmall}>or jane@example.com / securepass456</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '1rem',
  } as React.CSSProperties,
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  } as React.CSSProperties,
  title: {
    marginTop: '0',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    fontWeight: '600',
    textAlign: 'center' as const,
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
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
  button: {
    padding: '0.75rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
  } as React.CSSProperties,
  toggleButton: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    color: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'underline',
  } as React.CSSProperties,
  divider: {
    textAlign: 'center' as const,
    margin: '1rem 0',
    color: '#999',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    border: '1px solid #fcc',
  } as React.CSSProperties,
  demoInfo: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f0f8ff',
    borderRadius: '4px',
    borderLeft: '3px solid #0070f3',
  } as React.CSSProperties,
  demoTitle: {
    margin: '0 0 0.5rem 0',
    fontWeight: '600',
    color: '#0070f3',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  demoText: {
    margin: '0.25rem 0',
    fontSize: '0.85rem',
    color: '#333',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  demoTextSmall: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.8rem',
    color: '#666',
    fontStyle: 'italic',
  } as React.CSSProperties,
};
