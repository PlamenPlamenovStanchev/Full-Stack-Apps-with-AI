import 'dotenv/config';
import { db } from './index';
import { categories, jokes } from './schema';

async function main() {
  console.log('Clearing existing data...');
  await db.delete(jokes);
  await db.delete(categories);

  console.log('Seeding database...');
  
  // Seed Categories
  const [programmingCategory] = await db.insert(categories).values({
    name: 'Programming',
  }).returning();

  const [dadCategory] = await db.insert(categories).values({
    name: 'Dad Jokes',
  }).returning();

  const [punCategory] = await db.insert(categories).values({
    name: 'Puns',
  }).returning();

  // Seed Jokes
  await db.insert(jokes).values([
    {
      title: 'SQL query',
      text: 'A SQL query goes into a bar, walks up to two tables and asks... "Can I join you?"',
      categoryId: programmingCategory.id,
    },
    {
      title: 'Light bulb',
      text: 'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
      categoryId: programmingCategory.id,
    },
    {
      title: 'Fake noodle',
      text: 'What do you call a fake noodle? An impasta.',
      categoryId: punCategory.id,
    },
    {
      title: 'Skeleton',
      text: 'Why don\'t skeletons fight each other? They don\'t have the guts.',
      categoryId: dadCategory.id,
    }
  ]);

  console.log('Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
