CREATE TYPE "public"."movie_status" AS ENUM('to_watch', 'watching', 'watched');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"year" integer NOT NULL,
	"director" varchar(255) NOT NULL,
	"genre" varchar(120) NOT NULL,
	"poster_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"status" "movie_status" DEFAULT 'to_watch' NOT NULL,
	"rating" integer,
	"review" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_movies_rating_range_check" CHECK ("user_movies"."rating" IS NULL OR ("user_movies"."rating" >= 1 AND "user_movies"."rating" <= 10))
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(120) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_movies" ADD CONSTRAINT "user_movies_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_movies" ADD CONSTRAINT "user_movies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "movies_slug_unique" ON "movies" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "user_movies_movie_id_idx" ON "user_movies" USING btree ("movie_id");--> statement-breakpoint
CREATE INDEX "user_movies_user_id_idx" ON "user_movies" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_movies_user_movie_unique" ON "user_movies" USING btree ("user_id","movie_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");