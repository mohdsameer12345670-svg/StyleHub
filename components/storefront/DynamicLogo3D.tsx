'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DynamicLogo3DProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isScrolled?: boolean;
}

export default function DynamicLogo3D({
  size = 'md',
  className,
  isScrolled = false,
}: DynamicLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for interactive 3D physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery 3D tilt
  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dimensions based on size prop and scroll state
  const dimensionClasses = {
    sm: 'w-[28px] h-[28px]',
    md: isScrolled ? 'w-[36px] h-[36px]' : 'w-[42px] h-[42px]',
    lg: 'w-[52px] h-[52px]',
  }[size];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative select-none flex-shrink-0 cursor-pointer',
        dimensionClasses,
        className
      )}
      style={{ perspective: 800 }}
    >
      {/* ── 3D Ambient Aura Behind ── */}
      <motion.div
        animate={{
          scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.15, 1],
          opacity: isHovered ? 0.8 : 0.45,
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500/40 via-yellow-400/30 to-amber-600/20 blur-md pointer-events-none"
      />

      {/* ── 3D Tilting Card Container ── */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={
          !isHovered
            ? {
                y: [0, -2, 0],
                rotateZ: [-0.5, 0.5, -0.5],
              }
            : { y: -2 }
        }
        transition={
          !isHovered
            ? {
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : { duration: 0.2 }
        }
        className={cn(
          'relative w-full h-full rounded-[10px] overflow-hidden shadow-md transition-shadow duration-300',
          'border border-amber-400/30 bg-[#0d0d11]',
          isHovered
            ? 'shadow-[0_12px_24px_-4px_rgba(212,175,55,0.4),0_6px_12px_rgba(0,0,0,0.6)]'
            : 'shadow-[0_6px_16px_-2px_rgba(0,0,0,0.45)]'
        )}
      >
        {/* ── The High-End 3D Render Image ── */}
        <div
          className="relative w-full h-full"
          style={{ transform: 'translateZ(15px)' }}
        >
          <Image
            src="/style-hub-logo.png"
            alt="StyleHub 3D Logo"
            fill
            sizes="48px"
            priority
            className="object-cover transition-transform duration-300"
          />
        </div>

        {/* ── Dynamic Holographic Specular Sheen ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(255,230,160,0.4) 40%, transparent 70%)',
            left: isHovered ? glareX : '30%',
            top: isHovered ? glareY : '20%',
            transform: 'translate(-50%, -50%)',
            width: '160%',
            height: '160%',
          }}
        />

        {/* ── Continuous Light Sweep Gleam Animation ── */}
        <motion.div
          animate={{
            x: ['-120%', '200%'],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="pointer-events-none absolute inset-0 w-1/2 h-full -skew-x-25 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        {/* ── Sparkling Corner Gem Bead ── */}
        <motion.div
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffd700]"
        />
      </motion.div>
    </div>
  );
}
