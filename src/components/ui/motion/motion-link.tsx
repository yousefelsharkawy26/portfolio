// components/ui/motion/motion-link.tsx
'use client';

import { motion, MotionProps } from 'framer-motion';
import { AnchorHTMLAttributes } from 'react';

type MotionLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onAnimationStart'> & Omit<MotionProps, 'children' | 'onAnimationStart'>;

export const MotionLink = ({ 
  href, 
  children, 
  className = '', 
  ...props 
}: MotionLinkProps) => {
  return (
    <motion.a
      className={`text-blue-400 hover:text-blue-300 transition-colors ${className}`}
      whileHover={{ x: 5 }}
      href={href}
      {...props}
    >
      {children}
    </motion.a>
  );
};