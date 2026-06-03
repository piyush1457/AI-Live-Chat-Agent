import { Router, Request, Response } from 'express';
import { ChatRequest, ChatResponse, ApiError } from '../types';
import { createConversation, getConversation, saveMessage, getMessages, getAllMessages } from '../services/conversation';
import { generateReply } from '../services/llm';

const router = Router();

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

router.post('/message', async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body as ChatRequest;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: "Message cannot be empty" } as ApiError);
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long (max 2000 characters)" } as ApiError);
    }

    if (sessionId && !uuidRegex.test(sessionId)) {
      return res.status(400).json({ error: "Invalid session ID format" } as ApiError);
    }

    let conversationId = sessionId;
    if (!conversationId || !getConversation(conversationId)) {
      const newConversation = createConversation();
      conversationId = newConversation.id;
    }

    // Save user message
    saveMessage(conversationId, 'user', message);

    // Fetch last 10 messages for context
    const history = getMessages(conversationId, 10);

    // Generate reply
    const reply = await generateReply(history, message);

    // Save AI reply
    saveMessage(conversationId, 'ai', reply);

    const response: ChatResponse = {
      reply,
      sessionId: conversationId
    };
    return res.json(response);
  } catch (error) {
    console.error("Error in /message:", error);
    return res.status(500).json({ error: "Something went wrong" } as ApiError);
  }
});

router.get('/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (!uuidRegex.test(sessionId)) {
      return res.status(400).json({ error: "Invalid session ID format" } as ApiError);
    }

    const conversation = getConversation(sessionId);
    if (!conversation) {
      return res.status(404).json({ error: "Session not found" } as ApiError);
    }

    const messages = getAllMessages(sessionId);
    
    return res.json({ messages, sessionId });
  } catch (error) {
    console.error("Error in /:sessionId:", error);
    return res.status(500).json({ error: "Something went wrong" } as ApiError);
  }
});

export default router;
