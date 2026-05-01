import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/password';
import { createUser, getUserByEmail } from '@/lib/data';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = createUser(email, hashedPassword);

    const token = generateToken({ userId: user.id, email: user.email });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: { id: user.id, email: user.email, isAdmin: false },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
