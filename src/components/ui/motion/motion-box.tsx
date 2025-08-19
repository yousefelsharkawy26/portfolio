// components/ui/motion/motion-box.tsx
'use client';

import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import React, { ForwardedRef } from 'react';

type MotionBoxProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const MotionBox = React.forwardRef(function MotionBox(
  { children, ...props }: MotionBoxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, strip motion-specific props that animate
  // while preserving basic rendering and className.
  const safeProps = prefersReducedMotion
    ? {
        ...props,
        initial: undefined,
        animate: undefined,
        exit: undefined,
        whileHover: undefined,
        whileTap: undefined,
        transition: undefined,
        variants: undefined,
      }
    : props;
  return (
    <motion.div ref={ref} {...safeProps}>
      {children}
    </motion.div>
  );
});
MotionBox.displayName = 'MotionBox';