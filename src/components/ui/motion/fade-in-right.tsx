// components/ui/motion/fade-in-right.tsx
'use client';

import { MotionBox } from './motion-box';
import { fadeInRightVariants } from './variants';

interface FadeInRightProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInRight = ({ 
  children, 
  delay = 0, 
  className = "" 
}: FadeInRightProps) => {
  return (
    <MotionBox
      className={className}
      variants={fadeInRightVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};