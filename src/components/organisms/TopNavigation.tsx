import React from 'react';

interface TopNavigationProps {
  title: string;
  onMenuClick?: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  title, 
  onMenuClick 
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <h1 className="font-inter text-2xl font-bold text-white">
        {title}
      </h1>
      
      {onMenuClick && (
        <button 
          onClick={onMenuClick}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default TopNavigation;
