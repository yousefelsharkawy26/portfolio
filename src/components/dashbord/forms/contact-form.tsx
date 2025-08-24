"use client";

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { ContactInfo } from '@/lib/types';
import axios from 'axios';

interface ContactFormProps {
  onSave: (data: ContactInfo) => void;
  onCancel: () => void;
  initialData?: ContactInfo;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<ContactInfo>(initialData || {
    id: 0,
    icon: '',
    title: '',
    details: '',
    link: '',
    color: '#3b82f6',
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
      await axios.put(`/api/contact/${formData.id}`, formData)
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
      await axios.post('/api/contact', formData)
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
        <span className="text-gray-300">العنوان</span>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">التفاصيل</span>
        <input type="text" name="details" value={formData.details} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-300">الرابط</span>
        <input type="url" name="link" value={formData.link || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all" />
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

export default ContactForm;