import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAllUsers, createUser, updateUser } from '@/lib/data';
import { hashPassword } from '@/lib/password';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authenticated) return auth.error;

  try {
    const users = getAllUsers();
    // Return users without passwords
    const safeUsers = users.map(({ password, ...user }) => user);

    return NextResponse.json(
      { users: safeUsers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authenticated) return auth.error;

  try {
    const { email, password, isAdmin } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = createUser(email, hashedPassword);

    if (isAdmin !== undefined && isAdmin) {
      updateUser(user.id, email, true);
    }

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { ...safeUser, isAdmin: isAdmin ? true : false },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    if (message.includes('already exists')) {
      return NextResponse.json(
        { error: message },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
