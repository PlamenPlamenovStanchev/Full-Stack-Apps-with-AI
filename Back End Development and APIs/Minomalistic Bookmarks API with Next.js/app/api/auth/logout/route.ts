import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const token = extractToken(request.headers.get('authorization'));

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is missing' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // In JWT-based systems, logout is typically handled client-side by deleting the token
    return NextResponse.json(
      {
        message: 'Logout successful. Please delete the token on the client side.',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
