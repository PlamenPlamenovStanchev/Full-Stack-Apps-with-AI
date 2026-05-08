import { pgTable, serial, varchar, integer, foreignKey } from "drizzle-orm/pg-core";

export const genres = pgTable("genres", {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
});

export const movies = pgTable(
  "movies",
  {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    year: integer(),
    rating: varchar({ length: 10 }),
    genreId: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.genreId],
      foreignColumns: [genres.id],
    }),
  ]
);
