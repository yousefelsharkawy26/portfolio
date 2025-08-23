"use client";

import React from 'react';
import { X } from 'lucide-react';
import { TabType, SkillCategory, FormDataType } from '@/lib/types';
import ContactForm from './contact-form';
import SocialLinkForm from './social-link-form';
import ProjectForm from './project-form';
import SkillForm from './skill-form';

interface AddFormModalProps {
  activeTab: TabType;
  skillCategories: SkillCategory[];
  onSave: (data: FormDataType) => void;
  onCancel: () => void;
}

const AddFormModal: React.FC<AddFormModalProps> = ({ activeTab, skillCategories, onSave, onCancel }) => {
  const getFormTitle = () => {
    switch (activeTab) {
      case 'contacts': return 'إضافة معلومات اتصال';
      case 'social': return 'إضافة رابط اجتماعي';
      case 'projects': return 'إضافة مشروع';
      case 'skills': return 'إضافة مهارة';
      default: return 'إضافة عنصر جديد';
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'contacts':
        return <ContactForm onSave={onSave} onCancel={onCancel} />;
      case 'social':
        return <SocialLinkForm onSave={onSave} onCancel={onCancel} />;
      case 'projects':
        return <ProjectForm onSave={onSave} onCancel={onCancel} />;
      case 'skills':
        return <SkillForm onSave={onSave} onCancel={onCancel} skillCategories={skillCategories} />;
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

export default AddFormModal;