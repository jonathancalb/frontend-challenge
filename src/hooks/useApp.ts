import { useContext } from 'react';
import { AppContext } from '../types/context';
import type { AppContextType } from '../types/context';

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
