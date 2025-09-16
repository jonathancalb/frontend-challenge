import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
  onCancel: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry, onCancel }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl px-4 py-3 max-w-[320px]">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-red-300 font-medium">Failed to send message</p>
            <p className="text-xs text-red-400 mt-1">{error}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onRetry}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs py-2 px-3 rounded-lg transition-colors"
            >
              Retry
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 text-xs py-2 px-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
