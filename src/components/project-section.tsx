"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  EyeIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { MotionBox } from './ui/motion/motion-box';

// Project data interface
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
    longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment processing, and admin dashboard. Implemented with responsive design and optimized for performance.',
    image: '/images/e-commerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    category: 'Full Stack',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    status: 'planned'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'React-based task management application with drag-and-drop functionality.',
    longDescription: 'A modern task management application with intuitive drag-and-drop interface. Users can create projects, assign tasks, set deadlines, and track progress. Features real-time updates and collaborative workspace.',
    image: '/images/task-management.jpg',
    technologies: ['React', 'TypeScript', 'Firebase', 'Framer Motion'],
    category: 'Frontend',
    liveUrl: 'https://task-management-phi-two.vercel.app',
    githubUrl: 'https://github.com/yousefelsharkawy26/task-morph',
    featured: true,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Weather app with location-based forecasts and interactive charts.',
    longDescription: 'A comprehensive weather dashboard that provides detailed weather information, forecasts, and interactive charts. Features include location search, weather maps, and customizable dashboard widgets.',
    image: '/images/weather.jpg',
    technologies: ['Next.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
    category: 'Frontend',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
    status: 'planned'
  },
  {
    id: '4',
    title: 'API Management System',
    description: 'Backend system for managing APIs with authentication and rate limiting.',
    longDescription: 'A robust API management system built with Node.js and Express. Features include API gateway, authentication, rate limiting, monitoring, and comprehensive documentation.',
    image: '/images/api-management.jpg',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'Backend',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
    status: 'planned'
  },
  {
    id: '5',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media metrics and insights.',
    longDescription: 'A powerful analytics dashboard that aggregates social media data from multiple platforms. Provides insights, trend analysis, and automated reporting features.',
    image: '/images/social-media.jpg',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Full Stack',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    status: 'planned'
  },
  {
    id: '6',
    title: 'Mobile Banking App',
    description: 'React Native mobile application for banking services.',
    longDescription: 'A secure mobile banking application with features like account management, fund transfers, bill payments, and transaction history. Implements biometric authentication and real-time notifications.',
    image: '/images/mobile-banking.jpg',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Push Notifications'],
    category: 'Mobile',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    status: 'planned'
  }
];

// Filter categories
const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile'];

// Project card component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 }
    }
  };

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      id='projects'
    >
      {/* Project Status Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'completed' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : project.status === 'in-progress'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {project.status === 'in-progress' ? 'In Progress' : 
           project.status === 'completed' ? 'Completed' : 'Planned'}
        </span>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
            >
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex gap-3"
              >
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <EyeIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CodeBracketIcon className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + techIndex * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Live Demo
            </div>
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CodeBracketIcon className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </MotionBox>
  );
};

// Main Projects Section Component
const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    let filtered = projectsData;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [activeCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Here are some of my recent projects that showcase my skills and experience in web development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </MotionBox>

        {/* Search and Filter Controls */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <MotionBox variants={itemVariants} className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-all duration-300"
              />
            </MotionBox>

            {/* Category Filter */}
            <MotionBox variants={itemVariants} className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </MotionBox>
          </div>
        </MotionBox>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <MotionBox
            key={activeCategory + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </MotionBox>
        </AnimatePresence>

        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search terms or filter criteria.
            </p>
          </MotionBox>
        )}

        {/* Stats Section */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Total Projects', value: projectsData.length, suffix: '' },
            { label: 'Completed', value: projectsData.filter(p => p.status === 'completed').length, suffix: '' },
            { label: 'Technologies Used', value: 15, suffix: '+' },
            { label: 'Client Satisfaction', value: 100, suffix: '%' }
          ].map((stat, index) => (
            <MotionBox
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </MotionBox>
          ))}
        </MotionBox>

        {/* Call to Action */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Interested in working together?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let&apos;s discuss your project and bring your ideas to life.
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </MotionBox>
      </div>
    </section>
  );
};

export default ProjectsSection;