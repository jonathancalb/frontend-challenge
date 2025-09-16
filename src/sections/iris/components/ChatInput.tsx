import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  hasStreamingMessages: boolean;
  onFocus?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  hasStreamingMessages,
  onFocus
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showWaitingFeedback, setShowWaitingFeedback] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const canSendMessage = !isLoading && !hasStreamingMessages;

  // Auto-focus when component mounts and when available
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        onFocus?.();
      }, 100);
    }
  }, [isLoading, onFocus]);

  // Auto-send pending message when Iris becomes available
  useEffect(() => {
    if (canSendMessage && pendingMessage) {
      const messageToSend = pendingMessage;
      setPendingMessage('');
      setShowWaitingFeedback(false);
      setInputValue('');
      onSendMessage(messageToSend);
    }
  }, [canSendMessage, pendingMessage, onSendMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (canSendMessage) {
        const messageToSend = inputValue.trim();
        setInputValue(''); // Clear input immediately for better UX
        await onSendMessage(messageToSend);
      } else {
        // Store message to send automatically when Iris finishes
        const messageToSend = inputValue.trim();
        setPendingMessage(messageToSend);
        setShowWaitingFeedback(true);
      }
    }
  };

  // Expose focus method for parent components
  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    // Add a way for parent to trigger focus
    if (inputRef.current) {
      (inputRef.current as any).focusInput = focusInput;
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black px-6 pb-8 pt-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message..."
              className="w-full text-white rounded-full focus:outline-none focus:ring-2 placeholder-gray-400 transition-all"
              style={{
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--color-surface-overlay)',
                backdropFilter: 'var(--blur-sm)',
                border: showWaitingFeedback 
                  ? '1px solid var(--color-surface-warning-border)' 
                  : '1px solid var(--color-surface-glass)',
                boxShadow: showWaitingFeedback 
                  ? '0 0 0 2px var(--color-surface-warning)' 
                  : 'none',
                transitionDuration: 'var(--duration-base)'
              }}
              onFocus={(e) => {
                if (!showWaitingFeedback) {
                  e.target.style.boxShadow = '0 0 0 2px var(--color-focus-500)';
                }
              }}
              onBlur={(e) => {
                if (!showWaitingFeedback) {
                  e.target.style.boxShadow = 'none';
                }
              }}
              aria-label="Type your message"
            />
            {showWaitingFeedback && (inputValue || pendingMessage) && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <div className="waiting-dots text-sm">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
