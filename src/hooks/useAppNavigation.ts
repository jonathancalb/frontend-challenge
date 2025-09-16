import { useApp } from './useApp';
import type { NavItem } from '../components/organisms/BottomNavigation';
import { APP_VIEWS } from '../constants';

export const useAppNavigation = () => {
  const { state, setCurrentView } = useApp();

  const navItems: NavItem[] = [
    { 
      id: APP_VIEWS.INSIGHTS, 
      label: 'Insights', 
      icon: '/app/insights-icon.svg',
      onClick: () => setCurrentView(APP_VIEWS.INSIGHTS)
    },
    { 
      id: APP_VIEWS.CHAT, 
      label: 'Chat', 
      icon: '/app/chat-icon.svg',
      onClick: () => setCurrentView(APP_VIEWS.CHAT)
    },
    { 
      id: APP_VIEWS.IRIS, 
      label: 'Iris', 
      icon: '/app/iris-icon.svg',
      onClick: () => setCurrentView(APP_VIEWS.IRIS)
    },
    { 
      id: APP_VIEWS.EXPLORE, 
      label: 'Explore', 
      icon: '/app/discover-icon.svg',
      onClick: () => setCurrentView(APP_VIEWS.EXPLORE)
    },
  ];

  return {
    navItems,
    currentView: state.currentView,
    isBottomNavVisible: state.isBottomNavVisible
  };
};
