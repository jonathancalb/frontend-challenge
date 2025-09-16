import React from 'react';

interface AtmosphericGlowProps {
  variant?: 'default' | 'warm' | 'cool';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

const AtmosphericGlow: React.FC<AtmosphericGlowProps> = ({
  variant = 'default',
  intensity = 'medium',
  className = ''
}) => {
  const variants = {
    default: {
      outer: 'var(--color-glow-outer-primary) 0%, var(--color-glow-mid-primary) 25%, var(--color-glow-inner-primary) 50%, rgba(40, 40, 40, 0.2) 70%, transparent 100%',
      inner: 'var(--color-glow-overlay-primary) 0%, rgba(255, 120, 0, 0.5) 30%, rgba(255, 60, 0, 0.3) 60%, transparent 100%'
    },
    warm: {
      outer: 'rgba(255, 120, 80, 0.8) 0%, rgba(255, 100, 60, 0.6) 25%, rgba(255, 80, 40, 0.4) 50%, rgba(60, 40, 40, 0.2) 70%, transparent 100%',
      inner: 'rgba(255, 140, 100, 0.7) 0%, rgba(255, 100, 80, 0.5) 30%, rgba(255, 80, 60, 0.3) 60%, transparent 100%'
    },
    cool: {
      outer: 'rgba(120, 180, 255, 0.8) 0%, rgba(100, 140, 255, 0.6) 25%, rgba(80, 120, 255, 0.4) 50%, rgba(40, 40, 60, 0.2) 70%, transparent 100%',
      inner: 'rgba(140, 200, 255, 0.7) 0%, rgba(120, 160, 255, 0.5) 30%, rgba(100, 140, 255, 0.3) 60%, transparent 100%'
    }
  };

  const intensityModifiers = {
    subtle: { outerOpacity: 0.6, innerOpacity: 0.5 },
    medium: { outerOpacity: 0.8, innerOpacity: 0.7 },
    strong: { outerOpacity: 1.0, innerOpacity: 0.9 }
  };

  const modifier = intensityModifiers[intensity];
  const colorScheme = variants[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '60%',
          background: `radial-gradient(ellipse 100% 70% at 50% 100%, ${colorScheme.outer})`,
          opacity: modifier.outerOpacity,
          animation: `glowFadeIn 5s ease-out forwards`,
          willChange: 'opacity'
        }}
      />
    </div>
  );
};

export default AtmosphericGlow;
