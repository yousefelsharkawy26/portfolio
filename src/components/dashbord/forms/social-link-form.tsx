"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { SocialLink } from '@/lib/types';
import axios from 'axios';

interface SocialLinkFormProps {
  onSave: (data: SocialLink) => void;
  onCancel: () => void;
  initialData?: SocialLink;
}

const SocialLinkForm: React.FC<SocialLinkFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<SocialLink>(initialData || {
    id: 0,
    name: '',
    url: '',
    icon: '',
    color: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if initialData exists, we're editing, otherwise adding new
    if (initialData) {
      // update on server
      await axios.put(`/api/contact/social-links/${formData.id}`, formData)
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
      await axios.post('/api/contact/social-links', formData)
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
        <span className="text-gray-300">Platform Name</span>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">The URL</span>
        <input type="url" name="url" value={formData.url} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Icon Name</span>
        <input type="text" name="icon" value={formData.icon} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">Color (tailwind classes)</span>
        <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
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

export default SocialLinkForm;