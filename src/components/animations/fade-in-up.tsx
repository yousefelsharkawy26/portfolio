// components/animations/fade-in-up.tsx
'use client';

import { motion, Variants } from 'framer-motion';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    }
  }
};

export const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "" 
}: FadeInUpProps) => {
  return (
    <motion.div
      className={className}
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};