import React from 'react';
import { useApp } from '../../../hooks/useApp';
import { Toggle } from '../../../components/molecules/Toggle';
import type { ToggleOption } from '../../../components/molecules/Toggle';
import { GlowingOrb } from '../../../components/atoms/GlowingOrb';
import { IRIS_MODES } from '../constants';

export const IrisConversationHeader: React.FC = () => {
  const { state, endConversation, setIrisMode } = useApp();

  const toggleOptions: ToggleOption[] = [
    {
      id: IRIS_MODES.TALK,
      icon: '/app/talk-icon.svg',
      alt: 'Talk',
      label: 'Talk mode'
    },
    {
      id: IRIS_MODES.TEXT,
      icon: '/app/text-icon.svg',
      alt: 'Text',
      label: 'Text mode'
    }
  ];

  const handleEndSession = () => {
    endConversation();
  };

  return (
      <div className="flex items-center justify-between relative" style={{ padding: 'var(--space-4) var(--space-6)' }}>
      <Toggle 
        options={toggleOptions}
        activeOption={state.irisMode}
        onToggle={(optionId) => setIrisMode(optionId as any)}
      />
      
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <GlowingOrb
          size={32}
          shouldPulse={true}
          baseOpacity={0.8}
          blurIntensity={2}
        />
      </div>
      
      <button 
        onClick={handleEndSession}
        className="bg-gray-800/60 backdrop-blur-sm text-white rounded-full font-inter font-medium active:bg-gray-700/80 transition-all"
        style={{
          width: 'var(--button-width-sm)',
          height: 'var(--button-height-sm)',
          fontSize: 'var(--font-size-base)'
        }}
      >
        End
      </button>
    </div>
  );
};
