import { v4 as uuidv4 } from 'uuid';
import db from '../db/index';
import { Conversation, Message } from '../types';

export function createConversation(): Conversation {
  const id = uuidv4();
  const now = Date.now();
  
  const stmt = db.prepare('INSERT INTO conversations (id, created_at, updated_at) VALUES (?, ?, ?)');
  stmt.run(id, now, now);
  
  return {
    id,
    createdAt: now,
    updatedAt: now
  };
}

export function getConversation(id: string): Conversation | null {
  const stmt = db.prepare('SELECT id, created_at as createdAt, updated_at as updatedAt FROM conversations WHERE id = ?');
  const row = stmt.get(id) as Conversation | undefined;
  return row || null;
}

export function saveMessage(conversationId: string, sender: 'user' | 'ai', text: string): Message {
  const id = uuidv4();
  const timestamp = Date.now();
  
  const insertMessage = db.prepare('INSERT INTO messages (id, conversation_id, sender, text, timestamp) VALUES (?, ?, ?, ?, ?)');
  insertMessage.run(id, conversationId, sender, text, timestamp);
  
  const updateConversation = db.prepare('UPDATE conversations SET updated_at = ? WHERE id = ?');
  updateConversation.run(timestamp, conversationId);
  
  return {
    id,
    conversationId,
    sender,
    text,
    timestamp
  };
}

export function getMessages(conversationId: string, limit: number = 10): Message[] {
  const stmt = db.prepare(`
    SELECT id, conversation_id as conversationId, sender, text, timestamp 
    FROM messages 
    WHERE conversation_id = ? 
    ORDER BY timestamp DESC 
    LIMIT ?
  `);
  const rows = stmt.all(conversationId, limit) as Message[];
  return rows.reverse();
}

export function getAllMessages(conversationId: string): Message[] {
  const stmt = db.prepare(`
    SELECT id, conversation_id as conversationId, sender, text, timestamp 
    FROM messages 
    WHERE conversation_id = ? 
    ORDER BY timestamp ASC
  `);
  const rows = stmt.all(conversationId) as Message[];
  return rows;
}
