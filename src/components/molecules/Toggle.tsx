import React from 'react';

export interface ToggleOption {
  id: string;
  icon: string;
  alt: string;
  label: string;
}

interface ToggleProps {
  options: ToggleOption[];
  activeOption: string;
  onToggle: (optionId: string) => void;
  className?: string;
  width?: string;
  height?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  options, 
  activeOption, 
  onToggle, 
  className = '',
  width = '122px',
  height = '36px'
}) => {

  return (
    <div 
      className={`bg-gray-800/60 backdrop-blur-sm rounded-full p-1 flex ${className}`}
      style={{
        width,
        height
      }}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onToggle(option.id)}
          className={`flex items-center justify-center flex-1 h-full rounded-full transition-all duration-200 ${
            activeOption === option.id ? 'bg-black' : ''
          }`}
          aria-label={option.label}
        >
          <img 
            src={option.icon} 
            alt={option.alt} 
            className={`w-6 h-6 transition-all duration-200 ${
              activeOption === option.id ? 'brightness-0 saturate-100' : 'opacity-60'
            }`}
            style={activeOption === option.id ? {
              filter: 'brightness(0) saturate(100%) invert(78%) sepia(57%) saturate(351%) hue-rotate(128deg) brightness(97%) contrast(90%)'
            } : {}}
          />
        </button>
      ))}
    </div>
  );
};
