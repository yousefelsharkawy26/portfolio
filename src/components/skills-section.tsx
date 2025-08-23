"use client";

import { useEffect, useState } from "react";
import { MotionBox } from "./ui/motion/motion-box";
import { CategorySkills } from "@/lib/types";
import { MotionLink } from "./ui/motion/motion-link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState<CategorySkills[]>();
  
  // Fetch skills data from the API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/category-skills');
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        const data = await response.json();
        setSkillCategories(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);
  if (!skillCategories) {
    return <div>Loading...</div>;
  }
  if (skillCategories.length === 0) {
    return <div>No skills available</div>;
  }


    return (
      <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden relative"
               id="skills">
        <div className="container mx-auto px-4">
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-blue-500">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </MotionBox>
  
          <div className="grid md:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <MotionBox
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-blue-500 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <MotionBox
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </MotionBox>
            ))}
          </div>
        </div>
        {/* Scroll Indicator */}
        <MotionLink
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          href="#projects"
        >
          <ChevronDownIcon className="w-8 h-8 text-white/60" />
        </MotionLink>
      </section>
    );
  };

  export default SkillsSection;