// components/ui/motion/fade-in-down.tsx
'use client';

import { MotionBox } from './motion-box';
import { fadeInDownVariants } from './variants';

interface FadeInDownProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInDown = ({ 
  children, 
  delay = 0, 
  className = "" 
}: FadeInDownProps) => {
  return (
    <MotionBox
      className={className}
      variants={fadeInDownVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};