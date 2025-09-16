import React, { ReactNode } from 'react';
import TopNavigation from '../organisms/TopNavigation';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
  onMenuClick?: () => void;
  bottomNavigation?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  title, 
  children, 
  onMenuClick,
  bottomNavigation
}) => {
  return (
    <div className="flex flex-col h-full">
      <TopNavigation 
        title={title} 
        onMenuClick={onMenuClick}
      />
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {bottomNavigation}
    </div>
  );
};

export default AppLayout;
