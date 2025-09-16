import React from "react";

interface MoodVisualizationProps {
  mood: 'calm' | 'excited' | 'focused';
  isRecording?: boolean;
}

export const MoodVisualization: React.FC<MoodVisualizationProps> = ({ mood: _mood, isRecording = false }) => {
  // TODO: Implement mood-based visualization changes
  // Different moods ('calm', 'excited', 'focused') should affect:
  // - Orb colors (yellow/orange for calm, orange/red for excited, blue/purple for focused)
  // - Animation intensity and patterns
  // - Glow effects and opacity levels

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Yellow orb - center top */}
      <div 
        className={`absolute w-32 h-32 rounded-full ${isRecording ? 'animate-pulse' : ''} transition-all duration-300`}
        style={{
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: isRecording ? 0.9 : 0.7,
          animationDuration: '2s',
        }}
      />
      
      {/* Orange/Red orb - center bottom */}
      <div 
        className={`absolute w-28 h-28 rounded-full ${isRecording ? 'animate-pulse' : ''} transition-all duration-300`}
        style={{
          top: '65%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #FF6B35 0%, #F7931E 50%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: isRecording ? 0.8 : 0.6,
          animationDuration: '2.5s',
          animationDelay: '0.5s',
        }}
      />
      
      {/* Recording-specific gradient background */}
      {isRecording && (
        <div 
          className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-orange-900/10 to-transparent"
          style={{
            background: 'linear-gradient(to top, rgba(255, 140, 0, 0.15) 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
};
