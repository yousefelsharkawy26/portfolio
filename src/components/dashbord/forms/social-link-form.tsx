"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { SocialLink } from '@/lib/types';

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
    color: '#0077b5',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        <span className="text-gray-300">اسم المنصة</span>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">الرابط</span>
        <input type="url" name="url" value={formData.url} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">أيقونة</span>
        <input type="text" name="icon" value={formData.icon} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">اللون (#hex)</span>
        <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
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

export default SocialLinkForm;