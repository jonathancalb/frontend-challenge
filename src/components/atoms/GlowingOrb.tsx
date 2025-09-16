import React from 'react';

export interface GlowingOrbProps {
  /** Size of the orb in pixels */
  size: number;
  /** Enhanced size when animated (optional, defaults to size * 1.2) */
  animatedSize?: number;
  /** Color gradient start color */
  colorStart?: string;
  /** Color gradient end color */
  colorEnd?: string;
  /** Whether the orb should be animated/enlarged */
  isAnimated?: boolean;
  /** Whether to show pulse animation */
  shouldPulse?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation delay in seconds */
  animationDelay?: string;
  /** Opacity when not animated */
  baseOpacity?: number;
  /** Opacity when animated */
  animatedOpacity?: number;
  /** Blur intensity */
  blurIntensity?: number;
  /** Additional CSS classes */
  className?: string;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size,
  animatedSize,
  colorStart = 'var(--color-primary-yellow-light)',
  colorEnd = 'var(--color-primary-yellow)',
  isAnimated = false,
  shouldPulse = false,
  animationDuration = 2000,
  animationDelay = '0s',
  baseOpacity = 0.7,
  animatedOpacity = 1,
  blurIntensity = 2,
  className = ''
}) => {
  const currentSize = isAnimated ? (animatedSize || Math.round(size * 1.2)) : size;
  const currentOpacity = isAnimated ? animatedOpacity : baseOpacity;

  return (
    <div className={`relative ${className}`}>
      {/* Main orb with glow */}
      <div 
        className={`rounded-full transition-all ${shouldPulse && isAnimated ? 'animate-pulse' : ''}`}
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          background: `radial-gradient(circle, ${colorStart} 0%, ${colorEnd} 100%)`,
          filter: `blur(${blurIntensity}px)`,
          opacity: currentOpacity,
          animationDelay,
          transitionDuration: `${animationDuration}ms`,
          transitionTimingFunction: 'ease-in-out',
        }}
      />
      
      {/* Highlight overlay for depth */}
      <div 
        className="absolute top-0 left-0 rounded-full transition-all"
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
          filter: `blur(${Math.max(1, blurIntensity / 2)}px)`,
          mixBlendMode: 'overlay',
          opacity: 0.8,
          transitionDuration: `${animationDuration}ms`,
          transitionTimingFunction: 'ease-in-out',
        }}
      />
    </div>
  );
};
