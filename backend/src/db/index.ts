import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Auto-create the data/ folder if it doesn't exist
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Connect to SQLite file
const dbPath = path.join(dataDir, 'chat.db');
const db = new Database(dbPath);

// Export the db instance
export default db;
