// components/ui/motion/stagger-children.tsx
'use client';

import { MotionBox } from './motion-box';
import { staggerContainer } from './variants';

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerChildren = ({ 
  children, 
  staggerDelay = 0.1, 
  className = "" 
}: StaggerChildrenProps) => {
  return (
    <MotionBox
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: staggerDelay }}
    >
      {children}
    </MotionBox>
  );
};