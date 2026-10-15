'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  shimmer?: boolean;
  isLoading?: boolean;
}

const baseStyles =
  'group relative inline-flex items-center justify-center rounded-lg font-medium tracking-[0.01em] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 text-white shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 focus:ring-neutral-500/50',
  secondary:
    'bg-gradient-to-r from-zinc-100 via-white to-zinc-50 text-zinc-900 border border-zinc-200/80 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5 focus:ring-zinc-400/40',
  outline:
    'border border-zinc-300 bg-white/80 text-zinc-900 backdrop-blur-sm hover:bg-zinc-50 hover:shadow-md hover:scale-105 hover:-translate-y-0.5 focus:ring-zinc-400/40 shadow-sm',
  ghost:
    'bg-transparent text-zinc-900 hover:bg-zinc-100/90 hover:scale-105 focus:ring-zinc-400/40',
  destructive:
    'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 focus:ring-red-400/60',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-lg',
  md: 'h-10 px-4 sm:px-5 text-sm rounded-lg',
  lg: 'h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base rounded-xl',
};

export default function Button({
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  shimmer = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        shimmer &&
          'overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_2.2s_infinite]',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isLoading ? 'Loading...' : children}
      </span>
    </button>
  );
}
