import React from 'react';
import BottomNavigation from '../organisms/BottomNavigation';
import { useAppNavigation } from '../../hooks/useAppNavigation';

const BottomNavigationSection: React.FC = () => {
  const { navItems, currentView, isBottomNavVisible } = useAppNavigation();

  return (
    <BottomNavigation 
      items={navItems}
      activeItem={currentView}
      isVisible={isBottomNavVisible}
    />
  );
};

export default BottomNavigationSection;
