"use client";

import React from 'react';
import { X } from 'lucide-react';
import { TabType, ContactInfo, SocialLink, Project, Skill, SkillCategory, FormDataType } from '@/lib/types';
import ContactForm from './contact-form';
import SocialLinkForm from './social-link-form';
import ProjectForm from './project-form';
import SkillForm from './skill-form';

interface EditFormModalProps {
  activeTab: TabType;
  item: FormDataType;
  skillCategories: SkillCategory[];
  onSave: (data: FormDataType) => void;
  onCancel: () => void;
}

const EditFormModal: React.FC<EditFormModalProps> = ({ activeTab, item, skillCategories, onSave, onCancel }) => {
  const getFormTitle = () => {
    switch (activeTab) {
      case 'contacts': return 'تعديل معلومات اتصال';
      case 'social': return 'تعديل رابط اجتماعي';
      case 'projects': return 'تعديل مشروع';
      case 'skills': return 'تعديل مهارة';
      default: return 'تعديل عنصر';
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'contacts':
        return <ContactForm onSave={onSave} onCancel={onCancel} initialData={item as ContactInfo} />;
      case 'social':
        return <SocialLinkForm onSave={onSave} onCancel={onCancel} initialData={item as SocialLink} />;
        case 'projects':
          return <ProjectForm onSave={onSave} onCancel={onCancel} initialData={item as Project} />;
          case 'skills':
        return <SkillForm onSave={onSave} onCancel={onCancel} initialData={item as Skill} skillCategories={skillCategories} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000]/75 flex items-center justify-center p-4 z-50">
      <div className="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b border-gray-700 pb-4">
          {getFormTitle()}
        </h2>
        {renderForm()}
      </div>
    </div>
  );
};

export default EditFormModal;