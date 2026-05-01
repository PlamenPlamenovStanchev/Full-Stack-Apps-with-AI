import { NextRequest, NextResponse } from 'next/server';
import { getLatestJokes } from '@/lib/jokes';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    
    let limit = 5; // Default to 5 latest jokes
    if (limitParam) {
      const parsedLimit = parseInt(limitParam);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
      } else {
        return NextResponse.json(
          { error: 'Invalid limit parameter. Must be a positive number' },
          { status: 400 }
        );
      }
    }

    const jokes = getLatestJokes(limit);
    return NextResponse.json(jokes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch latest jokes' },
      { status: 500 }
    );
  }
}
