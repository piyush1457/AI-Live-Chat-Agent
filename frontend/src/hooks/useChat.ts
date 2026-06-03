import { useState, useEffect } from 'react';
import { Message, sendMessage as apiSendMessage, fetchHistory } from '../api/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('chat_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsLoading(true);
      fetchHistory(storedSessionId)
        .then(data => {
          setMessages(data.messages);
        })
        .catch(err => {
          console.error('Failed to load history', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Optimistic update
    const optimisticMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiSendMessage(text, sessionId || undefined);
      
      if (!sessionId) {
        setSessionId(response.sessionId);
        localStorage.setItem('chat_session_id', response.sessionId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), // Temporary ID until fetched on reload
        sender: 'ai',
        text: response.reply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('chat_session_id');
    setSessionId(null);
    setMessages([]);
    setError(null);
  };

  return { messages, isLoading, error, sendMessage, clearChat };
}
