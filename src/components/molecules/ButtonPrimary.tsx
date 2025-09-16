import React from 'react';
import { Button } from '../atoms/Button';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  icon,
  iconAlt,
  disabled = false,
  'aria-label': ariaLabel,
  className = '',
}) => {
  return (
    <Button
      variant="primary"
      size="lg"
      shape="pill"
      onClick={onClick}
      icon={icon}
      iconAlt={iconAlt}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`font-medium touch-manipulation ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
