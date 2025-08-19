// app/about/page.tsx
"use client";

import { MotionBox } from '@/components/ui/motion/motion-box';
import { MotionImage } from '@/components/ui/motion/motion-image';
import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

export default function AboutSection() {

  const stats = [
    { label: "Years Experience", value: "3+", icon: BriefcaseIcon },
    { label: "Projects Completed", value: "50+", icon: CodeBracketIcon },
    { label: "Technologies", value: "15+", icon: AcademicCapIcon },
  ];
  return ( 
  <section className="py-20 bg-slate-50 dark:bg-slate-800"
            id='about'>
    <div className="container mx-auto px-4">
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="text-blue-500">Me</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
      </MotionBox>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">

            <MotionImage
              src="/images/profile.jpg"
              alt="About Me"
              width={500}
              height={600}
              className="rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
          </div>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m a passionate Full Stack Developer with over 3 years of experience 
            creating modern, responsive web applications. I specialize in React, 
            Next.js, and Node.js, with a strong focus on user experience and 
            performance optimization.
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
            contributing to open-source projects, or sharing knowledge with 
            the developer community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </MotionBox>
            ))}
          </div>
        </MotionBox>
      </div>
    </div>
  </section>
);
};