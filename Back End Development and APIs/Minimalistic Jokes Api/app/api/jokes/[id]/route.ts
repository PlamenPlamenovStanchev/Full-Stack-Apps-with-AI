import { NextRequest, NextResponse } from 'next/server';
import { getJokeById, updateJoke, deleteJoke } from '@/lib/jokes';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jokeId = parseInt(id);
    if (isNaN(jokeId)) {
      return NextResponse.json(
        { error: 'Invalid joke ID' },
        { status: 400 }
      );
    }

    const joke = getJokeById(jokeId);
    if (!joke) {
      return NextResponse.json(
        { error: 'Joke not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(joke);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch joke' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jokeId = parseInt(id);
    if (isNaN(jokeId)) {
      return NextResponse.json(
        { error: 'Invalid joke ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, text } = body;

    if (!title || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: title and text' },
        { status: 400 }
      );
    }

    const updatedJoke = updateJoke(jokeId, title, text);
    if (!updatedJoke) {
      return NextResponse.json(
        { error: 'Joke not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedJoke);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update joke' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jokeId = parseInt(id);
    if (isNaN(jokeId)) {
      return NextResponse.json(
        { error: 'Invalid joke ID' },
        { status: 400 }
      );
    }

    const deleted = deleteJoke(jokeId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Joke not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Joke deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete joke' },
      { status: 500 }
    );
  }
}
