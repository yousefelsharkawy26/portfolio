// components/header.tsx
'use client'; // Add this at the top

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';

export const Header = () => {
  const { state, dispatch } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      <div className="container py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-xl font-bold text-white">
            Portfolio
          </Link>
        </motion.div>
        
        <nav className="hidden md:flex space-x-6">
          {['/', '/about', '/projects', '/blog', '/contact'].map((path, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link 
                href={path} 
                className="text-gray-300 hover:text-white transition-colors"
              >
                {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <motion.button
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className="p-2 rounded-lg bg-gray-800 text-yellow-300 hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {state.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </header>
  );
};