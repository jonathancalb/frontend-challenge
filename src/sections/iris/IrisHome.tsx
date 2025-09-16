import React from 'react';
import { useApp } from '../../hooks/useApp';
import { IRIS_MODES } from './constants';
import { GlowingOrb, TopNavigation, ButtonPrimary } from '../../components';

const IrisHome: React.FC = () => {
  const { setIrisMode } = useApp();

  const handleTalkClick = () => {
    setIrisMode(IRIS_MODES.TALK);
  };

  const handleTextClick = () => {
    setIrisMode(IRIS_MODES.TEXT);
  };

  const handleMenuClick = () => {
    // TODO: Implement menu functionality
  };

  return (
    <div className="h-full flex flex-col">
      <TopNavigation title="Iris" onMenuClick={handleMenuClick} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-6">
          <div className="mb-12">
            <GlowingOrb
              size={48}
              baseOpacity={1}
              blurIntensity={3}
            />
          </div>
          
          <p className="font-inter text-center text-base font-normal leading-relaxed" style={{ color: 'var(--color-neutral-400)' }}>
            Chat with Iris. The more you engage, the more you'll build self-awareness—and move through life with clarity and confidence.
          </p>
        </div>
      </div>
      <div className="px-6 pb-32">
        <div className="flex justify-center space-x-4">
          <ButtonPrimary
            onClick={handleTalkClick}
            icon="/app/talk-icon.svg"
            iconAlt="Talk"
            aria-label="Start talk mode"
          >
            Talk
          </ButtonPrimary>
          
          <ButtonPrimary
            onClick={handleTextClick}
            icon="/app/text-icon.svg"
            iconAlt="Text"
            aria-label="Start text mode"
          >
            Text
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default IrisHome;
