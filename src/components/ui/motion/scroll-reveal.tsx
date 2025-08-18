// components/ui/motion/scroll-reveal.tsx
'use client';

import { MotionBox } from './motion-box';
import { fadeInUpVariants } from './variants';
import { useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}

export const ScrollReveal = ({ 
  children, 
  delay = 0, 
  className = "",
  variants = fadeInUpVariants
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref= {ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
};