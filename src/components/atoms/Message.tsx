import React, { useState, useEffect } from "react";

const MESSAGE_SENDERS = {
  USER: 'user',
  AI: 'ai'
} as const;

const STREAMING_SPEED_MS = 30;

type MessageSender = typeof MESSAGE_SENDERS[keyof typeof MESSAGE_SENDERS];

interface MessageProps {
  message: {
    id: string;
    content: string;
    sender: MessageSender;
    timestamp: Date;
    isStreaming?: boolean;
  };
  onStreamingComplete?: (messageId: string) => void;
}

export const Message: React.FC<MessageProps> = ({ message, onStreamingComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreamingComplete, setIsStreamingComplete] = useState(!message.isStreaming);

  useEffect(() => {
    if (message.isStreaming) {
      let index = 0;
      const content = message.content;
      
      const timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(content.slice(0, index + 1));
          index++;
        } else {
          setIsStreamingComplete(true);
          clearInterval(timer);
          if (onStreamingComplete) {
            onStreamingComplete(message.id);
          }
        }
      }, STREAMING_SPEED_MS);

      return () => clearInterval(timer);
    } else {
      setDisplayedContent(message.content);
    }
  }, [message.content, message.isStreaming, message.id, onStreamingComplete]);

  const isUser = message.sender === MESSAGE_SENDERS.USER;

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-bubble group`}
      role="article"
      aria-label={`Message from ${isUser ? 'you' : 'Iris'}`}
    >
      <div
        className={`max-w-[280px] px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isUser
            ? 'text-white ml-auto'
            : 'bg-black text-white border'
        }`}
        style={{
          backgroundColor: isUser ? 'var(--color-neutral-900)' : 'black',
          borderColor: isUser ? 'transparent' : 'var(--color-neutral-600)'
        }}
        tabIndex={0}
      >
        <p className="text-sm leading-relaxed">
          {displayedContent}
          {message.isStreaming && !isStreamingComplete && (
            <span 
              className="inline-block w-2 h-4 ml-1 bg-current animate-pulse"
              aria-label="Message is being typed"
            ></span>
          )}
        </p>
        <p className="text-xs opacity-70 mt-1 opacity-0 group-hover:opacity-70 group-focus-within:opacity-70 transition-opacity">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};
