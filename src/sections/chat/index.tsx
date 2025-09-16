import React from 'react';
import { ComingSoon, AppLayout } from '../../components';
import BottomNavigation from '../components/BottomNavigation';

const Chat: React.FC = () => {
  return (
    <AppLayout 
      title="Chat"
      bottomNavigation={<BottomNavigation />}
    >
      <ComingSoon message="Chat interface coming soon..." />
    </AppLayout>
  );
};

export default Chat;
