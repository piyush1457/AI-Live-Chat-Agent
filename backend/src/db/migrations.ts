import db from './index';

export function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      created_at INTEGER,
      updated_at INTEGER
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT,
      sender TEXT,
      text TEXT,
      timestamp INTEGER,
      FOREIGN KEY(conversation_id) REFERENCES conversations(id)
    );
  `);

  console.log('Database ready');
}
