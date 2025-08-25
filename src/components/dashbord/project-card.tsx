import React from 'react';
import { Edit, Trash2, FolderOpen, Star, Code, Eye, Github } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-700 text-green-300';
      case 'in-progress': return 'bg-blue-700 text-blue-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In progress';
      default: return 'Planned';
    }
  };

  return (
    <div className="group bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-bold text-gray-100 text-xl">{project.title}</h3>
                {project.featured && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
              {project.category && (
                <div className="inline-flex items-center space-x-1 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm mb-4">
                  <Code className="w-3 h-3" />
                  <span>{project.category}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(project)}
              className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="bg-blue-800 text-blue-200 text-xs px-3 py-1 rounded-full font-medium">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
          <div className="flex space-x-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 bg-green-700 text-green-300 hover:bg-green-600 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <Eye className="w-3 h-3" />
                <span>Example</span>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <Github className="w-3 h-3" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;