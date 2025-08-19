"use client";

import { MotionBox } from "./ui/motion/motion-box";

const SkillsSection = () => {
    const skillCategories = [
      {
        title: "Frontend",
        skills: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 85 },
          { name: "JavaScript", level: 90 },
          { name: "React JS", level: 95 },
          { name: "Next JS", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "Tailwind CSS", level: 90 },
        ]
      },
      {
        title: "Backend",
        skills: [
          { name: "ASP.Net ( MVC | API)", level: 90 },
          { name: "Next JS API", level: 85 },
          { name: "Express JS", level: 80 },
        ]
      },
      {
        title: "Database",
        skills: [
          { name: "SQL Server", level: 90 },
          { name: "PostgreSQL", level: 70 },
          { name: "MongoDB", level: 75 },
        ]
      },
      {
        title: "Tools & Others",
        skills: [
          { name: "Git", level: 90 },
          { name: "Docker", level: 70 },
        ]
      }
    ];
  
    return (
      <section className="py-20 bg-white dark:bg-slate-900"
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
      </section>
    );
  };

  export default SkillsSection;