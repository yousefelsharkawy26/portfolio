// components/ui/motion/motion-button.tsx
'use client';

import { motion, MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type MotionButtonProps = Omit<MotionProps, 'children'> & ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const MotionButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: MotionButtonProps) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded transition-colors ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};