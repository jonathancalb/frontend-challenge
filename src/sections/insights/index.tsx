import React from 'react';
import { ComingSoon, AppLayout } from '../../components';
import BottomNavigation from '../components/BottomNavigation';

const Insights: React.FC = () => {
  return (
    <AppLayout 
      title="Insights"
      bottomNavigation={<BottomNavigation />}
    >
      <ComingSoon message="Insights interface coming soon..." />
    </AppLayout>
  );
};

export default Insights;
