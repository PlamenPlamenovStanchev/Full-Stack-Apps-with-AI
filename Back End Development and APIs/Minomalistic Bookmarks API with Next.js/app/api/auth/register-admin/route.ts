import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/data';
import { hashPassword } from '@/lib/password';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminSecret } = await request.json();

    // Validate admin secret
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-admin-registration-secret-key-12345';
    if (!adminSecret || adminSecret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 403 }
      );
    }

    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (getUserByEmail(email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password and create admin user
    const hashedPassword = await hashPassword(password);
    const user = createUser(email, hashedPassword, true);

    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email });

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
