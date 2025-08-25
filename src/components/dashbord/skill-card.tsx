import React from 'react';
import { Edit, Trash2, Award } from 'lucide-react';
import { Skill, SkillCategory } from '@/lib/types';

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
  skillCategories: SkillCategory[];
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete, skillCategories }) => {
  const category = skillCategories.find(c => c.id === skill.category_id);
  
  return (
    <div className="group bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-100 text-lg mb-1">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{category?.title}</p>
            </div>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(skill)}
              className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(skill.id)}
              className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Mastering level</span>
            <span className="text-lg font-bold text-orange-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-700 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Beginner</span>
            <span>advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;