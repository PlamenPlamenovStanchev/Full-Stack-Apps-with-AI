import { NextRequest, NextResponse } from 'next/server';
import { getRandomJoke } from '@/lib/jokes';

export async function GET(request: NextRequest) {
  try {
    const joke = getRandomJoke();
    if (!joke) {
      return NextResponse.json(
        { error: 'No jokes available' },
        { status: 404 }
      );
    }

    return NextResponse.json(joke);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch random joke' },
      { status: 500 }
    );
  }
}
