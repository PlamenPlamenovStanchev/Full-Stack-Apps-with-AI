import fs from 'fs';
import path from 'path';

export interface Bookmark {
  id: string;
  userId: string;
  url: string;
  description?: string;
  dateCreated: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface DataStore {
  users: User[];
  bookmarks: Bookmark[];
}

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Ensure data file exists
function ensureDataFile(): void {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData: DataStore = {
      users: [],
      bookmarks: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

export function readData(): DataStore {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data) as DataStore;
}

export function writeData(data: DataStore): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function getUserByEmail(email: string): User | null {
  const data = readData();
  return data.users.find((u) => u.email === email) || null;
}

export function getUserById(id: string): User | null {
  const data = readData();
  return data.users.find((u) => u.id === id) || null;
}

export function createUser(email: string, password: string, isAdmin: boolean = false): User {
  const data = readData();
  const id = `user_${Date.now()}`;
  const user: User = { id, email, password, isAdmin };
  data.users.push(user);
  writeData(data);
  return user;
}

export function getBookmarksByUserId(
  userId: string,
  page: number = 1,
  pageSize: number = 10
): { bookmarks: Bookmark[]; total: number } {
  const data = readData();
  const userBookmarks = data.bookmarks.filter((b) => b.userId === userId);
  const total = userBookmarks.length;
  const start = (page - 1) * pageSize;
  const bookmarks = userBookmarks
    .sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    )
    .slice(start, start + pageSize);
  return { bookmarks, total };
}

export function getBookmarkById(id: string, userId: string): Bookmark | null {
  const data = readData();
  return (
    data.bookmarks.find((b) => b.id === id && b.userId === userId) || null
  );
}

export function createBookmark(
  userId: string,
  url: string,
  description?: string
): Bookmark {
  const data = readData();
  const id = `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const bookmark: Bookmark = {
    id,
    userId,
    url,
    description,
    dateCreated: new Date().toISOString(),
  };
  data.bookmarks.push(bookmark);
  writeData(data);
  return bookmark;
}

export function updateBookmark(
  id: string,
  userId: string,
  url: string,
  description?: string
): Bookmark | null {
  const data = readData();
  const index = data.bookmarks.findIndex(
    (b) => b.id === id && b.userId === userId
  );
  if (index === -1) return null;
  data.bookmarks[index] = {
    ...data.bookmarks[index],
    url,
    description,
  };
  writeData(data);
  return data.bookmarks[index];
}

export function deleteBookmark(id: string, userId: string): boolean {
  const data = readData();
  const index = data.bookmarks.findIndex(
    (b) => b.id === id && b.userId === userId
  );
  if (index === -1) return false;
  data.bookmarks.splice(index, 1);
  writeData(data);
  return true;
}

// Admin Functions

export function getAllUsers(): User[] {
  const data = readData();
  return data.users;
}

export function getAllBookmarks(
  page: number = 1,
  pageSize: number = 10
): { bookmarks: Bookmark[]; total: number } {
  const data = readData();
  const total = data.bookmarks.length;
  const start = (page - 1) * pageSize;
  const bookmarks = data.bookmarks
    .sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    )
    .slice(start, start + pageSize);
  return { bookmarks, total };
}

export function getBookmarkByIdAdmin(id: string): Bookmark | null {
  const data = readData();
  return data.bookmarks.find((b) => b.id === id) || null;
}

export function createBookmarkAdmin(
  userId: string,
  url: string,
  description?: string
): Bookmark {
  const data = readData();
  const id = `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const bookmark: Bookmark = {
    id,
    userId,
    url,
    description,
    dateCreated: new Date().toISOString(),
  };
  data.bookmarks.push(bookmark);
  writeData(data);
  return bookmark;
}

export function updateBookmarkAdmin(
  id: string,
  userId: string,
  url: string,
  description?: string
): Bookmark | null {
  const data = readData();
  const index = data.bookmarks.findIndex((b) => b.id === id);
  if (index === -1) return null;
  data.bookmarks[index] = {
    ...data.bookmarks[index],
    userId,
    url,
    description,
  };
  writeData(data);
  return data.bookmarks[index];
}

export function deleteBookmarkAdmin(id: string): boolean {
  const data = readData();
  const index = data.bookmarks.findIndex((b) => b.id === id);
  if (index === -1) return false;
  data.bookmarks.splice(index, 1);
  writeData(data);
  return true;
}

export function updateUser(
  id: string,
  email: string,
  isAdmin?: boolean
): User | null {
  const data = readData();
  const index = data.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  data.users[index] = {
    ...data.users[index],
    email,
    ...(isAdmin !== undefined && { isAdmin }),
  };
  writeData(data);
  return data.users[index];
}

export function deleteUserAdmin(id: string): boolean {
  const data = readData();
  const userIndex = data.users.findIndex((u) => u.id === id);
  if (userIndex === -1) return false;

  // Delete user's bookmarks
  const updatedBookmarks = data.bookmarks.filter((b) => b.userId !== id);

  data.users.splice(userIndex, 1);
  data.bookmarks = updatedBookmarks;
  writeData(data);
  return true;
}
