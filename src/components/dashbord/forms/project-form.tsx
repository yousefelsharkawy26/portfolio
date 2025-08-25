"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Project } from '@/lib/types';
import axios from 'axios';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if initialData exists, we're editing, otherwise adding new
    if (initialData) {
      // update on server
      await axios.put(`/api/projects/${formData.id}`, formData)
        .then(response => {
          console.log('Contact updated:', response.data);
          onSave(response.data);
        })
        .catch(error => {
          console.error('There was an error updating the contact!', error);
        });
    }
    else {
      // add new to server
      await axios.post('/api/projects', formData)
        .then(response => {
          console.log('Contact added:', response.data);
          onSave(response.data);
        })
        .catch(error => {
          console.error('There was an error adding the contact!', error);
        });
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        <span className="text-gray-300">Title</span>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Description</span>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"></textarea>
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Long Description</span>
        <textarea name="description" value={formData.long_description} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"></textarea>
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Technologies (seperate by comma)</span>
        <input type="text" name="technologies" value={formData.technologies?.join(', ') || ''} onChange={handleTechChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Status</span>
        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3">
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
        </select>
      </label>
      <div className="flex items-center space-x-2 mb-4">
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 rounded w-5 h-5" />
        <span className="text-gray-300">Featured ?</span>
      </div>
      <label className="block mb-4">
        <span className="text-gray-300">GitHub link</span>
        <input type="url" name="github_url" value={formData.github_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Live Example</span>
        <input type="url" name="live_url" value={formData.live_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-700 text-gray-300 px-6 py-3 rounded-2xl hover:bg-gray-600 transition-all font-medium"
        >
          <span className="flex items-center space-x-2"><X className="w-5 h-5" /> Cancel</span>
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
        >
          <span className="flex items-center space-x-2"><Save className="w-5 h-5" /> {initialData ? 'Update' : 'Save'}</span>
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;