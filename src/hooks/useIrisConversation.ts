import { useState, useCallback, useEffect } from 'react';
import { getApiClient } from '../api';
import type { ChatMessage } from '../types/api';
import { useApp } from './useApp';

interface UseIrisConversationReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  sendMessage: (message: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
  initializeConversation: () => Promise<void>;
  endConversation: () => Promise<void>;
  clearError: () => void;
  markMessageAsComplete: (messageId: string) => void;
}

export const useIrisConversation = (): UseIrisConversationReturn => {
  const { state, setConversationMessages, setConversationId } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessageContent, setLastMessageContent] = useState<string>('');
  
  // Use global conversation state
  const messages = state.conversationMessages;
  const conversationId = state.conversationId;

  /**
   * Initialize a new conversation with welcome message
   */
  const initializeConversation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the appropriate API client
      const client = await getApiClient();

      // Create new conversation
      const conversation = await client.createConversation();
      setConversationId(conversation.id);

      // Set initial welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome-msg',
        content: 'Hi, what would you like to chat about today?',
        sender: 'ai',
        timestamp: new Date(),
      };

      setConversationMessages([welcomeMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize conversation');
    } finally {
      setIsLoading(false);
    }
  }, [setConversationId, setConversationMessages]);

  /**
   * Send a user message and get AI response
   */
  const sendMessage = useCallback(async (messageContent: string) => {
    if (!conversationId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setLastMessageContent(messageContent);

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content: messageContent,
        sender: 'user',
        timestamp: new Date(),
      };

      setConversationMessages([...messages, userMessage]);

      // Get the appropriate API client
      const client = await getApiClient();

      // Send message to API and get AI response
      const response = await client.sendMessage(messageContent, conversationId);

      // Add AI response with streaming effect only when sent
      const aiMessage: ChatMessage = {
        id: response.id,
        content: response.content,
        sender: 'ai',
        timestamp: new Date(response.timestamp),
        isStreaming: true,
      };

      setConversationMessages([...messages, userMessage, aiMessage]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, isLoading, messages, setConversationMessages]);

  /**
   * Retry the last message without adding a new user message
   */
  const retryLastMessage = useCallback(async () => {
    if (!conversationId || isLoading || !lastMessageContent) return;

    try {
      setIsLoading(true);
      setError(null);

      // Get the appropriate API client
      const client = await getApiClient();

      // Send message to API and get AI response
      const response = await client.sendMessage(lastMessageContent, conversationId);

      // Add AI response with streaming effect only when sent
      const aiMessage: ChatMessage = {
        id: response.id,
        content: response.content,
        sender: 'ai',
        timestamp: new Date(response.timestamp),
        isStreaming: true,
      };

      setConversationMessages([...messages, aiMessage]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, isLoading, lastMessageContent, messages, setConversationMessages]);

  /**
   * End the current conversation
   */
  const endConversation = useCallback(async () => {
    if (!conversationId) return;

    try {
      // Get the appropriate API client
      const client = await getApiClient();
      await client.endConversation(conversationId);
      
      // Reset state via context
      setConversationMessages([]);
      setConversationId(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end conversation');
    }
  }, [conversationId, setConversationMessages, setConversationId]);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Mark a streaming message as complete (remove streaming flag)
   */
  const markMessageAsComplete = useCallback((messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isStreaming: false } : msg
    );
    setConversationMessages(updatedMessages);
  }, [messages, setConversationMessages]);

  // Initialize conversation if not already active
  useEffect(() => {
    if (!state.hasActiveConversation && !conversationId && messages.length === 0) {
      initializeConversation();
    }
  }, [state.hasActiveConversation, conversationId, messages.length, initializeConversation]);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    retryLastMessage,
    initializeConversation,
    endConversation,
    clearError,
    markMessageAsComplete,
  };
};
