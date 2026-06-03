import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

export const sendMessage = async (message: string, sessionId?: string): Promise<{ reply: string; sessionId: string }> => {
  try {
    const response = await apiClient.post('/chat/message', { message, sessionId });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to send message';
    throw new Error(errorMessage);
  }
};

export const fetchHistory = async (sessionId: string): Promise<{ messages: Message[]; sessionId: string }> => {
  try {
    const response = await apiClient.get(`/chat/${sessionId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch history';
    throw new Error(errorMessage);
  }
};
