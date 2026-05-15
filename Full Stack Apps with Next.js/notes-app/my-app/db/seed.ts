import "dotenv/config";
import "dotenv/config";
import { db } from "./client";
import { notes, users } from "./schema";
import { eq } from "drizzle-orm";

const sampleNotes = [
  {
    title: "Setup Drizzle ORM",
    content:
      "Successfully configured Drizzle ORM with Neon PostgreSQL. Migrations are working smoothly and database is ready for production use.",
    tags: ["work", "backend", "setup"],
  },
  {
    title: "Frontend Component Ideas",
    content:
      "Design new React components for note editing and tagging. Consider using a rich text editor for better content formatting. Implement keyboard shortcuts for faster note creation.",
    tags: ["project", "frontend", "ideas"],
  },
  {
    title: "Bug: Tag filtering not working",
    content:
      "Users are unable to filter notes by tags. Need to debug the filter function and ensure proper tag array handling in queries.",
    tags: ["urgent", "bug", "frontend"],
  },
  {
    title: "Meeting Notes - Product Roadmap",
    content:
      "Discussed Q2 priorities. Key items: improve search performance, add collaboration features, implement dark mode. Target launch: end of May.",
    tags: ["meeting", "work", "roadmap"],
  },
  {
    title: "Personal Reminders",
    content:
      "Remember to update documentation, review pull requests, and prepare for the team standup tomorrow at 10 AM.",
    tags: ["personal", "reminders"],
  },
  {
    title: "Database Optimization Tips",
    content:
      "Add indexes on frequently queried columns. Consider partitioning large tables. Monitor query performance with pg_stat_statements extension.",
    tags: ["backend", "optimization", "documentation"],
  },
  {
    title: "Learning: Next.js 16 Features",
    content:
      "Explored new features in Next.js 16. Server Components are powerful for reducing bundle size. App Router is more intuitive than Pages Router.",
    tags: ["learning", "frontend", "next.js"],
  },
  {
    title: "Project Deadline Alert",
    content:
      "Notes application v1.0 must be completed by end of month. All core features working, now focusing on polish and performance improvements.",
    tags: ["urgent", "project", "deadline"],
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database with sample notes...");

    // Get or find the migration user
    const migrationUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "migration@notes.app"))
      .limit(1);

    if (!migrationUser || migrationUser.length === 0) {
      throw new Error("Migration user not found. Please run migrations first.");
    }

    const userId = migrationUser[0].id;

    // Add userId to sample notes
    const notesWithUserId = sampleNotes.map((note) => ({
      ...note,
      userId,
    }));

    // Insert sample notes
    const result = await db.insert(notes).values(notesWithUserId);

    console.log(`✅ Successfully seeded ${sampleNotes.length} sample notes!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
