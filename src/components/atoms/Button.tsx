import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'recording' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill' | 'circle';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  iconAlt?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  className = '',
  style,
  icon,
  iconAlt,
  fullWidth = false,
  fullHeight = false,
  color = 'var(--color-neutral-400)',
}) => {
  const baseClasses = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  const variants = {
    primary: 'bg-black/60 backdrop-blur-sm active:bg-black/80 border border-gray-700/50',
    secondary: 'bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 border border-gray-700/50',
    ghost: 'bg-gray-700/50 text-cyan-400 hover:bg-gray-600/50',
    recording: 'bg-black/40 backdrop-blur-sm border border-gray-600/30 hover:bg-black/60 text-green-400',
    blue: 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50',
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-8 py-3 text-base',
  };
  
  const shapes = {
    rounded: 'rounded-lg',
    pill: 'rounded-full',
    circle: 'rounded-full p-3',
  };
  
  const sizeClasses = fullWidth || fullHeight ? '' : sizes[size];
  const widthClass = fullWidth ? 'w-full' : '';
  const heightClass = fullHeight ? 'h-full' : '';
  const iconSpacing = icon ? 'flex items-center space-x-2' : '';
  
  const classes = [
    baseClasses,
    variants[variant],
    shape === 'circle' ? shapes[shape] : `${sizeClasses} ${shapes[shape]}`,
    widthClass,
    heightClass,
    iconSpacing,
    className,
  ].filter(Boolean).join(' ');
  
  const buttonStyle = {
    color,
    ...style,
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={buttonStyle}
    >
      {icon && <img src={icon} alt={iconAlt || ''} className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
};
