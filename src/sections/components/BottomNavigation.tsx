import React from 'react';
import BottomNavigationOrganism from '../../components/organisms/BottomNavigation';
import { useAppNavigation } from '../../hooks/useAppNavigation';

const BottomNavigation: React.FC = () => {
  const { navItems, currentView, isBottomNavVisible } = useAppNavigation();

  return (
    <BottomNavigationOrganism 
      items={navItems}
      activeItem={currentView}
      isVisible={isBottomNavVisible}
    />
  );
};

export default BottomNavigation;
