import React from 'react';

interface MicrophoneButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isMuted,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      className="rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm active:bg-gray-800/80"
      style={{
        width: '88px',
        height: '56px',
        backgroundColor: 'var(--color-neutral-900)'
      }}
      aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
    >
      <div
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '32px',
          paddingRight: '32px'
        }}
      >
        {isMuted ? (
          <img 
            src="/app/microphone-slash.svg" 
            alt="Muted microphone" 
            className="w-8 h-8 transition-all duration-300"
          />
        ) : (
          <img 
            src="/app/microphone.svg" 
            alt="Microphone" 
            className="w-8 h-8 transition-all duration-300"
          />
        )}
      </div>
    </button>
  );
};

export default MicrophoneButton;
