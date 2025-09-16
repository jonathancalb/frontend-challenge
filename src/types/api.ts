export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  userId?: string;
}

export interface SendMessageResponse {
  id: string;
  content: string;
  timestamp: string;
  conversationId: string;
  isStreaming?: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface ConversationContext {
  id: string;
  userId: string;
  messageCount: number;
  lastActivity: string;
}
