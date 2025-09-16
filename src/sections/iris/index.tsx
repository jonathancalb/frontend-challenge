import React from 'react';
import { useApp } from '../../hooks/useApp';
import { IRIS_MODES } from './constants';
import IrisHome from './IrisHome';
import IrisTalk from './IrisTalk';
import IrisText from './IrisText';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import { useAppNavigation } from '../../hooks/useAppNavigation';

const Iris: React.FC = () => {
  const { state } = useApp();
  const { navItems } = useAppNavigation();

  const renderIrisMode = () => {
    switch (state.irisMode) {
      case IRIS_MODES.HOME:
        return <IrisHome />;
      case IRIS_MODES.TALK:
        return <IrisTalk />;
      case IRIS_MODES.TEXT:
        return <IrisText />;
      default:
        return <IrisHome />;
    }
  };

  return (
    <div className="h-full">
      {renderIrisMode()}
      <div 
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          state.irisMode === IRIS_MODES.HOME 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
        style={{ maxWidth: 'var(--container-mobile-max)', width: '100%' }}
      >
        <BottomNavigation 
          items={navItems}
          activeItem={state.currentView}
          isVisible={state.irisMode === IRIS_MODES.HOME}
        />
      </div>
    </div>
  );
};

export default Iris;
