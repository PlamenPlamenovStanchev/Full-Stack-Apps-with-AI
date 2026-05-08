import { db } from '@/db';
import { jokes } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const result = await db.select().from(jokes).orderBy(sql`RANDOM()`).limit(1);
  if (result.length === 0) {
    return Response.json({ error: 'No jokes found' }, { status: 404 });
  }
  return Response.json(result[0]);
}
