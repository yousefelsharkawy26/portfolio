"use client";

import React, { useEffect, useState } from 'react';
import { ContactInfo, Project, SocialLink, Skill, SkillCategory, TabType, FormDataType } from '@/lib/types';
import DashboardHeader from '@/components/dashbord/dashbord-header';
import DashboardContent from '@/components/dashbord/dashboard-content';
import AddFormModal from '@/components/dashbord/forms/add-form';
import EditFormModal from '@/components/dashbord/forms/edit-form';
import MobileMenu from '@/components/dashbord/mobile-menu';
import axios from 'axios';

function isContactInfo(item: FormDataType): item is ContactInfo {
  return (item as ContactInfo).details !== undefined;
}

function isSocialLink(item: FormDataType): item is SocialLink {
  return (item as SocialLink).url !== undefined;
}

function isProject(item: FormDataType): item is Project {
  return (item as Project).title !== undefined;
}

function isSkill(item: FormDataType): item is Skill {
  return (item as Skill).level !== undefined;
}

const Dashboard = () => {

  

  const [activeTab, setActiveTab] = useState<TabType>('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FormDataType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const tabs = [
    { id: 'contacts' as TabType, label: 'Contact Info', count: contacts.length, color: 'from-blue-500 to-blue-600' },
    { id: 'social' as TabType, label: 'Social Links', count: socialLinks.length, color: 'from-purple-500 to-purple-600' },
    { id: 'projects' as TabType, label: 'Projects', count: projects.length, color: 'from-green-500 to-green-600'},
    { id: 'skills' as TabType, label: 'Skills', count: skills.length, color: 'from-orange-500 to-orange-600' }
  ];

  useEffect(() => {
    // Fetch initial data for contacts from API
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    // Fetch initial data for social links from API
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('/api/contact/social-links');
        const data = await response.json();
        setSocialLinks(data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    // Fetch initial data for projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Fetch initial data for skills from API
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/category-skills/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    // Fetch skill categories from API
    const fetchSkillCategories = async () => {
      try {
        const response = await fetch('/api/category-skills/categories');
        const data = await response.json();
        setSkillCategories(data);
      } catch (error) {
        console.error('Error fetching skill categories:', error);
      }
    };

    fetchSkillCategories();
    fetchSkills();
    fetchProjects();
    fetchSocialLinks();
    fetchContacts();
  }, []);


  const getData = (tab: TabType) => {
    switch (tab) {
      case 'contacts': return contacts;
      case 'social': return socialLinks;
      case 'projects': return projects;
      case 'skills': return skills;
      default: return [];
    }
  };

  const handleAdd = (formData: FormDataType) => {
  switch (activeTab) {
    case 'contacts':
      if (isContactInfo(formData)) {
        setContacts([...contacts, { ...formData, id: Date.now() }]);
      }
      break;
    case 'social':
      if (isSocialLink(formData)) {
        setSocialLinks([...socialLinks, { ...formData, id: Date.now() }]);
      }
      break;
    case 'projects':
      if (isProject(formData)) {
        setProjects([...projects, { ...formData, id: crypto.randomUUID() }]);
      }
      break;
    case 'skills':
      if (isSkill(formData)) {
        setSkills([...skills, { ...formData, id: Date.now() }]);
      }
      break;
  }
  setShowAddForm(false);
};

  const handleUpdate = (formData: FormDataType) => {
    switch (activeTab) {
      case 'contacts':
        if (editingItem && isContactInfo(formData))
          setContacts(contacts.map(c => c.id === editingItem.id ? { ...formData, id: editingItem.id } : c));
        break;
      case 'social':
        if (editingItem && isSocialLink(formData))
          setSocialLinks(socialLinks.map(s => s.id === editingItem.id ? { ...formData, id: editingItem.id } : s));
        break;
      case 'projects':
        if (editingItem && isProject(formData))
          setProjects(projects.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id } : p));
        break;
      case 'skills':
        if (editingItem && isSkill(formData))
          setSkills(skills.map(s => s.id === editingItem.id ? { ...formData, id: editingItem.id } : s));
        break;
    }
    setEditingItem(null);
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
    switch (activeTab) {
      case 'contacts':
        await axios.delete(`/api/contact/${id}`);
        setContacts(contacts.filter(c => c.id !== id));
        break;
      case 'social':
        setSocialLinks(socialLinks.filter(s => s.id !== id));
        break;
      case 'projects':
        setProjects(projects.filter(p => p.id !== id));
        break;
      case 'skills':
        setSkills(skills.filter(s => s.id !== id));
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <MobileMenu 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        setShowAddForm={setShowAddForm}
      />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <DashboardHeader 
          activeTab={activeTab}
          tabs={tabs} 
          setActiveTab={setActiveTab} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setShowAddForm={setShowAddForm}
        />
        
        <DashboardContent
          activeTab={activeTab}
          data={getData(activeTab)}
          searchTerm={searchTerm}
          handleEdit={setEditingItem}
          handleDelete={handleDelete}
          skillCategories={skillCategories}
        />

        {showAddForm && (
          <AddFormModal
            activeTab={activeTab}
            skillCategories={skillCategories}
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingItem && (
          <EditFormModal
            activeTab={activeTab}
            item={editingItem}
            skillCategories={skillCategories}
            onSave={handleUpdate}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;