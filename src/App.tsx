import React from 'react';
import { AppProvider } from './stores/AppStore';
import { useApp } from './hooks/useApp';
import DeviceWrapper from './mocks/devices/DeviceWrapper';
import Iris from './sections/iris';
import Chat from './sections/chat';
import Insights from './sections/insights';
import Explore from './sections/explore';

const AppContent: React.FC = () => {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'iris':
        return <Iris />;
      case 'chat':
        return <Chat />;
      case 'insights':
        return <Insights />;
      case 'explore':
        return <Explore />;
      default:
        return <Iris />;
    }
  };

  return (
    <DeviceWrapper>
      {renderCurrentView()}
    </DeviceWrapper>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
