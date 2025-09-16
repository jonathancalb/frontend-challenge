import React, { useRef, useEffect } from 'react';
import { IrisConversationHeader } from './components/IrisConversationHeader';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { Message } from '../../components/atoms/Message';
import { useIrisConversation } from '../../hooks/useIrisConversation';

const IrisText: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    markMessageAsComplete,
    clearError
  } = useIrisConversation();

  // Auto-scroll to bottom when messages change or when loading starts/stops
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-scroll when loading state changes (especially when Iris starts responding)
  useEffect(() => {
    if (isLoading) {
      // Scroll when loading indicator appears
      setTimeout(scrollToBottom, 100);
    }
  }, [isLoading]);

  // Auto-scroll when error appears
  useEffect(() => {
    if (error) {
      setTimeout(scrollToBottom, 100);
    }
  }, [error]);

  // Enhanced markMessageAsComplete to scroll after streaming
  const handleMessageComplete = (messageId: string) => {
    markMessageAsComplete(messageId);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  // Check if any messages are currently streaming
  const hasStreamingMessages = messages.some(msg => msg.isStreaming);

  const handleChatInputFocus = () => {
    scrollToBottom();
  };

  // Retry the last failed message without creating a new user message
  const handleRetry = async () => {
    clearError();
    await retryLastMessage();
  };

  return (
    <div className="h-full flex flex-col relative">
      <IrisConversationHeader />

      {/* Divider line */}
      <div className="border-t" style={{ borderColor: 'var(--color-neutral-600)' }}></div>

      {/* Chat title */}
      <div className="text-center py-4 border-b" style={{ borderColor: 'var(--color-neutral-600)' }}>
        <h2 className="text-white font-medium">Chatting with Sam</h2>
      </div>

      {/* Messages area - account for input area at bottom */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0" style={{ paddingBottom: '120px' }}>
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            onStreamingComplete={handleMessageComplete}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && <LoadingIndicator />}
        
        {/* Error message */}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={handleRetry}
            onCancel={clearError}
          />
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        hasStreamingMessages={hasStreamingMessages}
        onFocus={handleChatInputFocus}
      />
    </div>
  );
};

export default IrisText;