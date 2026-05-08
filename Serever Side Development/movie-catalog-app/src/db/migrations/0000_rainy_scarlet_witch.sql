CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "genres_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"year" integer,
	"rating" varchar(10),
	"genreId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_genreId_genres_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;