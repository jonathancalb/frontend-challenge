import { createContext } from 'react';
import type { ChatMessage } from './api';
import type { IrisMode, AppView } from './app';

export interface AppState {
  currentView: AppView;
  irisMode: IrisMode;
  isRecording: boolean;
  isBottomNavVisible: boolean;
  conversationMessages: ChatMessage[];
  conversationId: string | null;
  hasActiveConversation: boolean;
}

export interface AppContextType {
  state: AppState;
  setCurrentView: (view: AppView) => void;
  setIrisMode: (mode: IrisMode) => void;
  setIsRecording: (recording: boolean) => void;
  setBottomNavVisible: (visible: boolean) => void;
  setConversationMessages: (messages: ChatMessage[]) => void;
  setConversationId: (id: string | null) => void;
  endConversation: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

