import { NextRequest } from 'next/server';
import { db } from '@/db';
// Need to add index to db from drizzle/schema exports
import { jokes } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const categoryId = searchParams.get('categoryId');
  const offset = (page - 1) * limit;

  let baseQuery = db.select().from(jokes).limit(limit).offset(offset);
  
  if (categoryId) {
    baseQuery = baseQuery.where(eq(jokes.categoryId, parseInt(categoryId, 10))) as any;
  }

  const result = await baseQuery;
  return Response.json({ data: result, page, limit });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(jokes).values({
      title: body.title,
      text: body.text,
      categoryId: body.categoryId,
    }).returning();
    
    return Response.json(result[0], { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
