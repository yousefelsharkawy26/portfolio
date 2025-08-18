// components/ui/motion/motion-box.tsx
'use client';

import { motion, MotionProps } from 'framer-motion';
import React, { ForwardedRef } from 'react';

type MotionBoxProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const MotionBox = React.forwardRef(function MotionBox(
  { children, ...props }: MotionBoxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <motion.div ref={ref} {...props}>
      {children}
    </motion.div>
  );
});
MotionBox.displayName = 'MotionBox';