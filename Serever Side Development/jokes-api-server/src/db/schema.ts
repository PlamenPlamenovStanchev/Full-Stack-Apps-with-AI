import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  text: text('text').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  publishDate: timestamp('publish_date').defaultNow(),
});
