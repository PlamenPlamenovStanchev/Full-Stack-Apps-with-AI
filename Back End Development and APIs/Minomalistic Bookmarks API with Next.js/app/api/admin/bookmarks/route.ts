import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import {
  getAllBookmarks,
  getBookmarkByIdAdmin,
  createBookmarkAdmin,
  updateBookmarkAdmin,
  deleteBookmarkAdmin,
} from '@/lib/data';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authenticated) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get('pageSize') || '10')));

    const { bookmarks, total } = getAllBookmarks(page, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      {
        bookmarks,
        pagination: { page, pageSize, total, totalPages },
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

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authenticated) return auth.error;

  try {
    const { userId, url, description } = await request.json();

    if (!userId || !url) {
      return NextResponse.json(
        { error: 'userId and url are required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const bookmark = createBookmarkAdmin(userId, url, description);

    return NextResponse.json(
      {
        message: 'Bookmark created successfully',
        bookmark,
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
