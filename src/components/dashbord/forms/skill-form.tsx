"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Skill, SkillCategory } from '@/lib/types';
import axios from 'axios';

interface SkillFormProps {
  onSave: (data: Skill) => void;
  onCancel: () => void;
  initialData?: Skill;
  skillCategories: SkillCategory[];
}

const SkillForm: React.FC<SkillFormProps> = ({ onSave, onCancel, initialData, skillCategories }) => {
  const [formData, setFormData] = useState<Skill>(initialData || {
    id: 0,
    name: '',
    level: 0,
    category_id: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'level' || name === 'category_id' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if initialData exists, we're editing, otherwise adding new
    if (initialData) {
      // update on server
      await axios.put(`/api/skills/${formData.id}`, formData)
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
      await axios.post('/api/skills', formData)
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
        <span className="text-gray-300">Skill Name</span>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">The Level (1-100)</span>
        <input type="number" name="level" value={formData.level} onChange={handleChange} min="1" max="100" required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Category</span>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3">
          <option value="">Choose category...</option>
          {skillCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
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

export default SkillForm;