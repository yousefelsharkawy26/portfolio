// components/ui/motion/scale-in.tsx
'use client';

import { MotionBox } from './motion-box';
import { scaleVariants } from './variants';

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({ 
  children, 
  delay = 0, 
  className = "" 
}: ScaleInProps) => {
  return (
    <MotionBox
      className={className}
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};