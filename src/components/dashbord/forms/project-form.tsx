"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectFormProps {
  onSave: (data: Project) => void;
  onCancel: () => void;
  initialData?: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Project>(initialData || {
    id: '',
    title: '',
    description: '',
    technologies: [],
    category: '',
    featured: false,
    status: 'in-progress',
    github_url: '',
    live_url: '',
    image: '',
    long_description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: isChecked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map(tech => tech.trim());
    setFormData({ ...formData, technologies: techs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        <span className="text-gray-300">عنوان المشروع</span>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">وصف قصير</span>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"></textarea>
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">التقنيات (افصل بينها بفاصلة)</span>
        <input type="text" name="technologies" value={formData.technologies?.join(', ') || ''} onChange={handleTechChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">الحالة</span>
        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3">
          <option value="in-progress">قيد التطوير</option>
          <option value="completed">مكتمل</option>
          <option value="planned">مخطط</option>
        </select>
      </label>
      <div className="flex items-center space-x-2 mb-4">
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 rounded w-5 h-5" />
        <span className="text-gray-300">مشروع مميز؟</span>
      </div>
      <label className="block mb-4">
        <span className="text-gray-300">رابط GitHub</span>
        <input type="url" name="github_url" value={formData.github_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">رابط مباشر</span>
        <input type="url" name="live_url" value={formData.live_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-700 text-gray-300 px-6 py-3 rounded-2xl hover:bg-gray-600 transition-all font-medium"
        >
          <span className="flex items-center space-x-2"><X className="w-5 h-5" /> إلغاء</span>
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
        >
          <span className="flex items-center space-x-2"><Save className="w-5 h-5" /> {initialData ? 'تحديث' : 'حفظ'}</span>
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;