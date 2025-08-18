// components/animations/hero-animation.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const HeroAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x / 20,
      y: mousePosition.y / 20,
    },
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      variants={variants}
      animate="default"
      transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20"></div>
    </motion.div>
  );
};