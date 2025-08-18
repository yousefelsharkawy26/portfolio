// components/ui/motion/motion-text.tsx
'use client';

import { motion, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';



export const MotionText = ({ children, className,...props }: MotionProps & HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>) => {
  return (
    <motion.div {...props} className={`primary ${className}`}>
      {children}
    </motion.div>
  );
};