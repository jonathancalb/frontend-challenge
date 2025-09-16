import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppContext } from '../types/context';
import type { AppContextType, AppState } from '../types/context';
import type { AppView } from '../types/app';
import type { ChatMessage } from '../types/api';
import { IRIS_MODES, IrisModeHelpers } from '../sections/iris/constants';
import type { IrisMode } from '../types/app';
import { APP_VIEWS } from '../constants';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentView: APP_VIEWS.IRIS,
    irisMode: IrisModeHelpers.getDefaultMode(),
    isRecording: false,
    isBottomNavVisible: true,
    conversationMessages: [],
    conversationId: null,
    hasActiveConversation: false,
  });

  const setCurrentView = (view: AppView) => {
    setState(prev => ({ ...prev, currentView: view }));
    if (view !== APP_VIEWS.IRIS) {
      setState(prev => ({ ...prev, irisMode: IRIS_MODES.HOME }));
    }
  };

  const setIrisMode = (mode: IrisMode) => {
    setState(prev => ({ ...prev, irisMode: mode }));
    const shouldShowNav = IrisModeHelpers.shouldShowBottomNav(mode);
    setState(prev => ({ ...prev, isBottomNavVisible: shouldShowNav }));
  };

  const setIsRecording = (recording: boolean) => {
    setState(prev => ({ ...prev, isRecording: recording }));
  };

  const setBottomNavVisible = (visible: boolean) => {
    setState(prev => ({ ...prev, isBottomNavVisible: visible }));
  };

  const setConversationMessages = (messages: ChatMessage[]) => {
    setState(prev => ({ 
      ...prev, 
      conversationMessages: messages,
      hasActiveConversation: messages.length > 0 
    }));
  };

  const setConversationId = (id: string | null) => {
    setState(prev => ({ 
      ...prev, 
      conversationId: id,
      hasActiveConversation: id !== null && prev.conversationMessages.length > 0
    }));
  };

  const endConversation = () => {
    setState(prev => ({
      ...prev,
      conversationMessages: [],
      conversationId: null,
      hasActiveConversation: false,
      irisMode: IRIS_MODES.HOME,
      isBottomNavVisible: true
    }));
  };

  const value: AppContextType = {
    state,
    setCurrentView,
    setIrisMode,
    setIsRecording,
    setBottomNavVisible,
    setConversationMessages,
    setConversationId,
    endConversation,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
