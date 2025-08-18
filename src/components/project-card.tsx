// components/project-card.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl || '/images/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link href={`/projects/${project.id}`}>
          <motion.button
            className="text-blue-400 hover:text-blue-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            View Details →
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};