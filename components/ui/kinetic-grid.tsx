'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type KineticGridColorTheme =
  | 'luxury'
  | 'default'
  | 'monochrome'
  | 'emerald'
  | 'amber'
  | 'violet'
  | 'rose';

export interface KineticGridProps extends React.HTMLAttributes<HTMLDivElement> {
  globalColor?: KineticGridColorTheme;
  cellSize?: number;
  influenceRadius?: number;
  maxWarp?: number;
  rippleSpeed?: number;
  lerpSpeed?: number;
  showDots?: boolean;
  showVignette?: boolean;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundFilter?: string;
  children?: React.ReactNode;
}

export default function KineticGrid({
  globalColor = 'default',
  cellSize = 60,
  influenceRadius = 260,
  maxWarp = 20,
  rippleSpeed = 300,
  lerpSpeed = 0.08,
  showDots = true,
  showVignette = true,
  backgroundImage,
  backgroundPosition = 'center',
  backgroundFilter,
  className,
  children,
  ...props
}: KineticGridProps) {
  const colors: Record<KineticGridColorTheme, string> = {
    luxury: '#d4af37',
    default: '#4a9eff',
    monochrome: '#ffffff',
    emerald: '#10b981',
    amber: '#f59e0b',
    violet: '#a855f7',
    rose: '#f43f5e',
  };

  const accent = colors[globalColor];

  const baseBackgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(7, 9, 13, 0.52), rgba(7, 9, 13, 0.82)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
        filter: backgroundFilter,
      }
    : {
        backgroundImage: `radial-gradient(circle at center, ${accent}22 0%, rgba(11,11,15,0.9) 55%)`,
      };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#0b0b0f] text-white',
        className,
      )}
      {...props}
      style={baseBackgroundStyle}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundImage: `linear-gradient(to right, ${accent}22 1px, transparent 1px), linear-gradient(to bottom, ${accent}22 1px, transparent 1px)`,
          maskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
        }}
      />
      {showDots && (
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(${accent} 1.2px, transparent 1.2px)`,
            backgroundSize: `${cellSize * 0.8}px ${cellSize * 0.8}px`,
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
          }}
        />
      )}
      {showVignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
