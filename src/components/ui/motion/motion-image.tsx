// components/ui/motion/motion-image.tsx
'use client';

import React, { ForwardedRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, MotionProps, useReducedMotion } from 'framer-motion';

type MotionImageProps = ImageProps & MotionProps;

const BaseMotionImage = motion.create(Image);

export const MotionImage = React.forwardRef(function MotionImage(
  { children, ...props }: MotionImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const prefersReducedMotion = useReducedMotion();

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
    <BaseMotionImage ref={ref} {...safeProps} loading='lazy'>
      {children as React.ReactNode}
    </BaseMotionImage>
  );
});

MotionImage.displayName = 'MotionImage';

