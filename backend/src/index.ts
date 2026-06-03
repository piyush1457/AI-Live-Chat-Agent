import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { runMigrations } from './db/migrations';
import chatRouter from './routes/chat';

// Run migrations on startup
try {
  runMigrations();
} catch (error) {
  console.error("Failed to run migrations:", error);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*' // Allow all origins for deployment
}));
app.use(express.json());

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(globalLimiter);

// Chat specific rate limiter
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 messages per minute
  message: { error: 'You are sending messages too fast. Please slow down.' }
});

// Mount chat router
app.use('/chat', chatLimiter, chatRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
