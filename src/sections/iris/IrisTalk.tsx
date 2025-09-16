import React, { useState, useEffect } from 'react';
import { IrisConversationHeader } from './components/IrisConversationHeader';
import { GlowingOrb, AtmosphericGlow, MicrophoneButton } from '../../components';

const IrisTalk: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [orbAnimation, setOrbAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrbAnimation(prev => !prev);
    }, 100);
    
    const interval = setInterval(() => {
      setOrbAnimation(prev => !prev);
    }, 4000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const handleMicrophoneToggle = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="h-full flex flex-col relative">
      <IrisConversationHeader />

      <AtmosphericGlow variant="default" intensity="medium" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="mb-20">
          <GlowingOrb
            size={48}
            animatedSize={96}
            isAnimated={orbAnimation}
            shouldPulse={false}
            animationDuration={4000}
            animationDelay="0s"
            baseOpacity={0.8}
            animatedOpacity={0.8}
            blurIntensity={4}
          />
        </div>

        <div>
          <GlowingOrb
            size={48}
            animatedSize={96}
            colorStart="var(--color-secondary-orange-light)"
            colorEnd="var(--color-secondary-orange)"
            isAnimated={!orbAnimation}
            shouldPulse={false}
            animationDuration={4000}
            animationDelay="0s"
            baseOpacity={0.7}
            animatedOpacity={0.7}
            blurIntensity={3}
          />
        </div>
      </div>

      <div className="px-6 pb-8 relative z-10">
        <div className="flex justify-start">
          <MicrophoneButton
            isMuted={isMuted}
            onToggle={handleMicrophoneToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default IrisTalk;
