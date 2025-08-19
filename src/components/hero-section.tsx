// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { type Variants } from 'framer-motion';
import { MotionBox } from '@/components/ui/motion/motion-box';
import { MotionText } from '@/components/ui/motion/motion-text';
import { MotionButton } from '@/components/ui/motion/motion-button';
import { MotionImage } from '@/components/ui/motion/motion-image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Stable SSR positions; randomize client-side after mount to avoid hydration mismatch
  const [dotPositions, setDotPositions] = useState(() =>
    Array.from({ length: 20 }, () => ({ left: 50, top: 50 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Randomize positions only on the client after hydration
    setDotPositions(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
             id="home">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {dotPositions.map((pos, i) => (
          <MotionBox
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: mousePosition.x * (0.1 + i * 0.001),
              y: mousePosition.y * (0.1 + i * 0.001),
            }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 px-4"
      >
        <MotionBox variants={itemVariants} className="mb-8">
          <div className="relative inline-block">
            <MotionImage
              src="/images/profile.jpg"
              width={150}
              height={150}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl mx-auto"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              />
            <MotionBox
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </MotionBox>

        <MotionText variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Yousef El-Sharkawy
          </span>
        </MotionText>

        <MotionBox variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-8 h-20">
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'React Specialist',
              2000,
              'Next.js Expert',
              2000,
              'UI/UX Enthusiast',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </MotionBox>

        <MotionText
          variants={itemVariants}
          className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Passionate about creating exceptional digital experiences through clean code,
          innovative design, and cutting-edge technologies. Let&apos;s build something amazing together.
        </MotionText>

        <MotionBox variants={itemVariants} className="flex gap-4 justify-center">
          <MotionButton
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </MotionButton>
          <MotionButton
            className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </MotionButton>
        </MotionBox>
      </MotionBox>

      {/* Scroll Indicator */}
      <MotionBox
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDownIcon className="w-8 h-8 text-white/60" />
      </MotionBox>
    </section>
  );
}