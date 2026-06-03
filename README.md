# AI Live Chat Agent

## Overview
A premium, AI-powered live chat support widget built for e-commerce stores. It provides an elegant, 3D glass-morphism chat interface on the frontend and leverages an LLM on the backend to deliver context-aware, helpful customer support.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Local Setup (step by step)

### 1. Clone the repository
```bash
git clone <repository-url>
cd "AI-powered live chat support widget"
```

### 2. Backend setup
Navigate to the backend directory, install dependencies, configure your environment, and start the development server.
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your API key
npm run dev
```

### 3. Frontend setup
Open a new terminal, navigate to the frontend directory, install dependencies, configure your environment, and start Vite.
```bash
cd frontend
npm install
cp .env.example .env
# Ensure VITE_API_URL points to the backend (default: http://localhost:3001)
npm run dev
```

## Database
- Auto-migrates on server start, no manual steps required.
- SQLite database file is automatically created at `backend/data/chat.db`.

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `Groq_API_KEY` | `backend/.env` | API key required to authenticate with the LLM provider. |
| `PORT` | `backend/.env` | The port for the Express backend server (default: 3001). |
| `VITE_API_URL` | `frontend/.env` | The base URL for the backend API, used by the React frontend. |

## Architecture Overview

### Folder Structure
- `/backend`: Node.js Express server handling the API, LLM integration, and SQLite database.
- `/frontend`: Vite + React frontend containing the premium chat widget UI and state management.

### Backend Layers
The backend is structured into clean layers:
- **Routes (`src/routes`)**: API endpoints that receive HTTP requests and handle validation.
- **Services (`src/services`)**: Core business logic. Separated into `conversation.ts` (database operations) and `llm.ts` (AI generation).
- **Database (`src/db`)**: SQLite connection and migrations.

### How a message flows end to end
1. User types a message in the frontend `InputBar` and hits Send.
2. The frontend optimistically adds the message to the UI and makes a POST request to `/chat/message`.
3. The Express route validates the input and calls the conversation service to save the user message to SQLite.
4. The route fetches the last 10 messages from the database as context.
5. The LLM service is called with the context and system prompt to generate a reply.
6. The AI reply is saved to the SQLite database.
7. The route responds with the AI's reply and the active `sessionId`.
8. The frontend receives the response, updates the UI with the AI's message, and saves the `sessionId` in `localStorage`.

## LLM Integration
- **Provider:** Anthropic Claude (claude-haiku-4-5)
- **How prompting works:** A detailed system prompt gives the agent an explicit persona ("Maya"), context about the store ("ShopEasy" policies), and strict instructions not to hallucinate or answer off-topic questions. The last 10 messages are passed alongside every new prompt to retain conversation memory.
- **Why Haiku:** Claude Haiku is chosen for its blazing fast inference speeds and low cost, which is absolutely crucial for a real-time live chat widget where latency ruins the user experience.
- **Token cap (500) and why:** The `max_tokens` is hard-capped at 500 to ensure concise, chat-appropriate responses (preventing massive walls of text) and to predictably control API costs.

## Trade-offs & If I Had More Time
1. **No WebSockets:** Currently, the app uses standard REST endpoints. If I had more time, I would implement WebSockets (e.g., Socket.io) for true real-time, bi-directional communication, allowing for streaming LLM tokens directly to the UI for a perceived zero-latency experience.
2. **User Authentication:** The chat relies on a simple `sessionId` stored in `localStorage`. I would add proper JWT authentication to link chat histories securely to registered user accounts.
3. **Database Scalability:** SQLite is great for quick setups and small scopes, but for a production SaaS, I would migrate to PostgreSQL to handle high concurrency and horizontal scaling.
4. **State Management:** The frontend state is managed via a custom React hook (`useChat`). For a larger application, I would migrate this to a robust state management library like Redux Toolkit or React Query for better caching and background syncing.
5. **Rate Limiting & Security:** The API endpoints lack robust rate-limiting. I would implement `express-rate-limit` to prevent abuse of the LLM API, and tighten up CORS and payload validation.
