import fs from 'fs';
import path from 'path';

export interface Joke {
  id: number;
  title: string;
  text: string;
  publishDate: string;
}

const jokesFilePath = path.join(process.cwd(), 'data', 'jokes.json');

// Ensure data directory and file exist
function ensureDataFile() {
  const dataDir = path.dirname(jokesFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(jokesFilePath)) {
    fs.writeFileSync(jokesFilePath, JSON.stringify([]));
  }
}

export function readJokes(): Joke[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(jokesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading jokes:', error);
    return [];
  }
}

export function writeJokes(jokes: Joke[]): void {
  try {
    ensureDataFile();
    fs.writeFileSync(jokesFilePath, JSON.stringify(jokes, null, 2));
  } catch (error) {
    console.error('Error writing jokes:', error);
  }
}

export function getJokeById(id: number): Joke | undefined {
  const jokes = readJokes();
  return jokes.find(joke => joke.id === id);
}

export function getAllJokes(): Joke[] {
  return readJokes();
}

export function getRandomJoke(): Joke | undefined {
  const jokes = readJokes();
  if (jokes.length === 0) return undefined;
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export function getLatestJokes(count: number): Joke[] {
  const jokes = readJokes();
  // Sort by publish date descending and take the first 'count' items
  return jokes
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, Math.max(1, count));
}

export function createJoke(title: string, text: string): Joke {
  const jokes = readJokes();
  const newId = jokes.length > 0 ? Math.max(...jokes.map(j => j.id)) + 1 : 1;
  const newJoke: Joke = {
    id: newId,
    title,
    text,
    publishDate: new Date().toISOString(),
  };
  jokes.push(newJoke);
  writeJokes(jokes);
  return newJoke;
}

export function updateJoke(id: number, title: string, text: string): Joke | null {
  const jokes = readJokes();
  const jokeIndex = jokes.findIndex(joke => joke.id === id);
  if (jokeIndex === -1) return null;
  
  jokes[jokeIndex] = {
    ...jokes[jokeIndex],
    title,
    text,
  };
  writeJokes(jokes);
  return jokes[jokeIndex];
}

export function deleteJoke(id: number): boolean {
  const jokes = readJokes();
  const initialLength = jokes.length;
  const filteredJokes = jokes.filter(joke => joke.id !== id);
  
  if (filteredJokes.length === initialLength) {
    return false; // Joke not found
  }
  
  writeJokes(filteredJokes);
  return true;
}
