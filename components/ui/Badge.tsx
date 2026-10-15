'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'info' | 'destructive';
  pulse?: boolean;
}

export default function Badge({
  className,
  variant = 'default',
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const styles = {
    default: 'bg-foreground text-background',
    info: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]',
        styles[variant],
        pulse && 'animate-pulse',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
