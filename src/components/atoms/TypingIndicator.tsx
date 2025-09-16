import React from "react";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start" role="status" aria-live="polite">
      <div className="bg-black/60 backdrop-blur-sm text-white max-w-xs lg:max-w-md px-4 py-3 rounded-2xl border border-gray-700/50">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1" aria-hidden="true">
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2">Iris is typing...</span>
        </div>
      </div>
      <span className="sr-only">Iris is currently typing a response</span>
    </div>
  );
};
