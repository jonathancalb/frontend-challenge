import React from 'react';
import { ComingSoon, AppLayout } from '../../components';
import BottomNavigation from '../components/BottomNavigation';

const Explore: React.FC = () => {
  return (
    <AppLayout 
      title="Explore"
      bottomNavigation={<BottomNavigation />}
    >
      <ComingSoon message="Explore interface coming soon..." />
    </AppLayout>
  );
};

export default Explore;
