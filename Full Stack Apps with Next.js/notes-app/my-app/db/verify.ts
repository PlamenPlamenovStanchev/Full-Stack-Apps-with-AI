import "dotenv/config";
import { db } from "./client";
import { notes } from "./schema";

async function verifySeeding() {
  try {
    const allNotes = await db.select().from(notes);
    console.log(`\n📊 Database Verification\n`);
    console.log(`Total notes in database: ${allNotes.length}\n`);

    allNotes.forEach((note, index) => {
      console.log(`${index + 1}. "${note.title}"`);
      console.log(`   Tags: ${note.tags?.join(", ") || "none"}`);
      console.log(`   Content: ${note.content.substring(0, 50)}...`);
      console.log();
    });

    process.exit(0);
  } catch (error) {
    console.error("Error verifying database:", error);
    process.exit(1);
  }
}

verifySeeding();
