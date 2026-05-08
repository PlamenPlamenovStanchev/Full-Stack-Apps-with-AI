import { NextRequest } from 'next/server';
import { db } from '@/db';
import { jokes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) return Response.json({ error: 'Invalid ID' }, { status: 400 });

  const result = await db.select().from(jokes).where(eq(jokes.id, id)).limit(1);
  if (!result.length) return Response.json({ error: 'Not found' }, { status: 404 });
  
  return Response.json(result[0]);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) return Response.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await request.json();
    const result = await db.update(jokes)
      .set(body)
      .where(eq(jokes.id, id))
      .returning();
      
    if (!result.length) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(result[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) return Response.json({ error: 'Invalid ID' }, { status: 400 });

  const result = await db.delete(jokes).where(eq(jokes.id, id)).returning();
  if (!result.length) return Response.json({ error: 'Not found' }, { status: 404 });
  
  return Response.json({ success: true, deleted: result[0] });
}
