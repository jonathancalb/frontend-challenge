import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}

interface BottomNavigationProps {
  items: NavItem[];
  activeItem: string;
  isVisible?: boolean;
  height?: string;
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeItem,
  isVisible = true,
  height = '88px',
  className = ''
}) => {

  return (
    <div 
      className={`border-t border-teal-600 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`} 
      style={{ height }}
    >
      <nav 
        className="flex justify-between items-end h-full" 
        style={{ 
          paddingLeft: '24px', 
          paddingRight: '24px', 
          paddingBottom: '30px',
          paddingTop: '16px',
          gap: '42px'
        }}
        aria-label="Navigation"
      >
        {items.map((item) => {
          const isActive = activeItem === item.id;
          
          return (
            <button 
              key={item.id}
              className={`flex flex-col items-center space-y-1 transition-colors touch-manipulation rounded-lg ${
                isActive ? 'active:bg-cyan-500/20' : 'active:bg-gray-800/30'
              }`}
              onClick={item.onClick}
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className={`w-6 h-6 transition-all ${
                  isActive 
                    ? 'brightness-0 saturate-100' 
                    : 'opacity-60'
                }`}
                style={isActive ? {
                  filter: 'brightness(0) saturate(100%) invert(64%) sepia(95%) saturate(364%) hue-rotate(160deg) brightness(101%) contrast(101%)'
                } : undefined}
              />
              <span 
                className={`font-inter text-xs font-normal leading-[14px] tracking-normal ${
                  isActive ? 'text-cyan-400' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavigation;
