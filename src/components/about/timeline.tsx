// components/about/timeline.tsx
'use client';

import { motion } from 'framer-motion';
import { FadeInUp } from '../animations/fade-in-up';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <FadeInUp key={index} delay={index * 0.2}>
            <div className="relative flex items-start">
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-4 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"
                whileHover={{ scale: 1.5 }}
              ></motion.div>
              
              <div className="ml-12 bg-gray-800 p-6 rounded-lg">
                <div className="text-blue-400 font-medium mb-1">{item.year}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
};