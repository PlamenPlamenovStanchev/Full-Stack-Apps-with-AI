import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from './jwt';
import { getUserById } from './data';

export async function requireAuth(request: NextRequest) {
  const token = extractToken(request.headers.get('authorization'));

  if (!token) {
    return {
      authenticated: false,
      error: NextResponse.json(
        { error: 'Authorization token is missing' },
        { status: 401 }
      ),
      payload: null,
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      authenticated: false,
      error: NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      ),
      payload: null,
    };
  }

  const user = getUserById(payload.userId);
  if (!user) {
    return {
      authenticated: false,
      error: NextResponse.json({ error: 'User not found' }, { status: 404 }),
      payload: null,
    };
  }

  return {
    authenticated: true,
    error: null,
    payload: { userId: user.id, email: user.email, isAdmin: user.isAdmin },
  };
}

export async function requireAdmin(request: NextRequest) {
  const auth = await requireAuth(request);

  if (!auth.authenticated) {
    return {
      authenticated: false,
      error: auth.error,
      payload: null,
    };
  }

  if (!auth.payload?.isAdmin) {
    return {
      authenticated: false,
      error: NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      ),
      payload: null,
    };
  }

  return auth;
}
