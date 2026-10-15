'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={cn('w-full rounded-2xl bg-white p-6 shadow-2xl', sizeClasses[size], className)}>
        <div className="mb-4 flex items-center justify-between gap-4">
          {title ? <h2 className="text-xl font-semibold text-foreground">{title}</h2> : <div />}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-foreground-secondary hover:bg-background-secondary"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
