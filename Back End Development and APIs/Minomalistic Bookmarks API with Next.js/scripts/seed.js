#!/usr/bin/env node

/**
 * Seed script to generate initial sample data (data.json)
 * Run this before starting the dev server for the first time
 * Usage: node scripts/seed.js
 */

const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

async function generateSampleData() {
  try {
    // Hash passwords
    const hashedPassword1 = await bcryptjs.hash('password123', 10);
    const hashedPassword2 = await bcryptjs.hash('securepass456', 10);

    const data = {
      users: [
        {
          id: 'user_1',
          email: 'john@example.com',
          password: hashedPassword1,
        },
        {
          id: 'user_2',
          email: 'jane@example.com',
          password: hashedPassword2,
        },
      ],
      bookmarks: [
        // Bookmarks for user_1
        {
          id: 'bookmark_1',
          userId: 'user_1',
          url: 'https://nextjs.org',
          description: 'Next.js official documentation',
          dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_2',
          userId: 'user_1',
          url: 'https://typescript.org',
          description: 'TypeScript handbook',
          dateCreated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_3',
          userId: 'user_1',
          url: 'https://react.dev',
          description: 'React official site',
          dateCreated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_4',
          userId: 'user_1',
          url: 'https://nodejs.org',
          description: 'Node.js runtime',
          dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_5',
          userId: 'user_1',
          url: 'https://github.com',
          description: 'GitHub - where the world builds software',
          dateCreated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_6',
          userId: 'user_1',
          url: 'https://stackoverflow.com',
          description: 'Stack Overflow - Q&A for developers',
          dateCreated: new Date(Date.now()).toISOString(),
        },
        {
          id: 'bookmark_7',
          userId: 'user_1',
          url: 'https://mdn.org',
          description: 'MDN Web Docs',
          dateCreated: new Date(Date.now() + 1000).toISOString(),
        },
        {
          id: 'bookmark_8',
          userId: 'user_1',
          url: 'https://webpack.js.org',
          description: 'Webpack documentation',
          dateCreated: new Date(Date.now() + 2000).toISOString(),
        },
        {
          id: 'bookmark_9',
          userId: 'user_1',
          url: 'https://tailwindcss.com',
          description: 'Tailwind CSS - Utility-first CSS framework',
          dateCreated: new Date(Date.now() + 3000).toISOString(),
        },
        {
          id: 'bookmark_10',
          userId: 'user_1',
          url: 'https://expressjs.com',
          description: 'Express.js web framework',
          dateCreated: new Date(Date.now() + 4000).toISOString(),
        },
        {
          id: 'bookmark_11',
          userId: 'user_1',
          url: 'https://graphql.org',
          description: 'GraphQL - Query language for APIs',
          dateCreated: new Date(Date.now() + 5000).toISOString(),
        },
        {
          id: 'bookmark_12',
          userId: 'user_1',
          url: 'https://mongodb.com',
          description: 'MongoDB - The most popular database',
          dateCreated: new Date(Date.now() + 6000).toISOString(),
        },

        // Bookmarks for user_2
        {
          id: 'bookmark_13',
          userId: 'user_2',
          url: 'https://python.org',
          description: 'Python programming language',
          dateCreated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_14',
          userId: 'user_2',
          url: 'https://djangoproject.com',
          description: 'Django web framework',
          dateCreated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_15',
          userId: 'user_2',
          url: 'https://flask.palletsprojects.com',
          description: 'Flask - Lightweight web framework',
          dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'bookmark_16',
          userId: 'user_2',
          url: 'https://pandas.pydata.org',
          description: 'Pandas - Data analysis library',
          dateCreated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };

    const dataPath = path.join(__dirname, '..', 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log('✅ Sample data created successfully at data.json');
  } catch (error) {
    console.error('❌ Error generating sample data:', error);
    process.exit(1);
  }
}

generateSampleData();
