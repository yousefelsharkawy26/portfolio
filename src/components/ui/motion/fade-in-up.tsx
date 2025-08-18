// components/ui/motion/fade-in-up.tsx
'use client';

import { MotionBox } from './motion-box';
import { fadeInUpVariants } from './variants';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInUp = ({ 
  children, 
  delay = 0, 
  className = "" 
}: FadeInUpProps) => {
  return (
    <MotionBox
      className={className}
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};