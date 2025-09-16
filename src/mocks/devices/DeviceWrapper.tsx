import React, { ReactNode } from 'react';
import PhoneStatusBar from './PhoneStatusBar';

interface DeviceWrapperProps {
  children: ReactNode;
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ children }) => {
  // Only show device wrapper in development
  const isDevelopment = (import.meta as any).env.MODE === 'development';

  if (!isDevelopment) {
    // Apply mobile constraints in production too
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="flex flex-col h-screen bg-black text-white font-sf-pro w-full relative" style={{ maxWidth: 'var(--container-mobile-max)' }}>
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col h-screen bg-black text-white font-sf-pro w-full relative" style={{ maxWidth: 'var(--container-mobile-max)' }}>
        <PhoneStatusBar />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceWrapper;
