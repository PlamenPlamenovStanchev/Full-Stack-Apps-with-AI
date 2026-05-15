CREATE TABLE "users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "user_id" text;
--> statement-breakpoint
-- Create a default user for existing notes
INSERT INTO "users" ("email", "password_hash") 
VALUES ('migration@notes.app', '$2b$10$YIjlrPNo0lb/pcHvhD5H.eYzjcI9l8I6gFxEhtBK.7uW.iI.jOaAW')
ON CONFLICT DO NOTHING;
--> statement-breakpoint
-- Assign existing notes to the default user
UPDATE "notes" SET "user_id" = (SELECT "id" FROM "users" WHERE "email" = 'migration@notes.app' LIMIT 1)
WHERE "user_id" IS NULL;
--> statement-breakpoint
-- Now make user_id NOT NULL
ALTER TABLE "notes" ALTER COLUMN "user_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;