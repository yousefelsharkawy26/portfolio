// components/animations/stagger-children.tsx
'use client';

import { motion, Variants } from 'framer-motion';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const StaggerChildren = ({ 
  children, 
  className = "" 
}: StaggerChildrenProps) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};