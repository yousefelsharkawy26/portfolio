// components/animations/hero-animation.tsx
'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

export const HeroAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set((e.clientX - window.innerWidth / 2) / 20);
      y.set((e.clientY - window.innerHeight / 2) / 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, x, y]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light blur-3xl opacity-20 will-change-transform"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light blur-3xl opacity-20 will-change-transform"></div>
      <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light blur-3xl opacity-20 will-change-transform"></div>
    </motion.div>
  );
};