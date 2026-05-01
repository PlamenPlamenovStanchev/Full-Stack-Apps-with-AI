import { NextRequest, NextResponse } from 'next/server';
import { getAllJokes, createJoke } from '@/lib/jokes';

export async function GET(request: NextRequest) {
  try {
    const jokes = getAllJokes();
    return NextResponse.json(jokes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jokes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, text } = body;

    if (!title || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: title and text' },
        { status: 400 }
      );
    }

    const newJoke = createJoke(title, text);
    return NextResponse.json(newJoke, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create joke' },
      { status: 500 }
    );
  }
}
