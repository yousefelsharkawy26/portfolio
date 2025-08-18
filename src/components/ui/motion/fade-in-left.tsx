// components/ui/motion/fade-in-left.tsx
'use client';

import { MotionBox } from './motion-box';
import { fadeInLeftVariants } from './variants';

interface FadeInLeftProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInLeft = ({ 
  children, 
  delay = 0, 
  className = "" 
}: FadeInLeftProps) => {
  return (
    <MotionBox
      className={className}
      variants={fadeInLeftVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};