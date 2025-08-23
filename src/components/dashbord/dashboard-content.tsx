import React from 'react';
import { Search, Users, Link, FolderOpen, Award } from 'lucide-react';
import ContactCard from '@/components/dashbord/contact-card';
import SocialLinkCard from '@/components/dashbord/social-link-card';
import ProjectCard from '@/components/dashbord/project-card';
import SkillCard from '@/components/dashbord/skill-card';

import { ContactInfo, SocialLink, Project, Skill, SkillCategory, FormDataType } from '@/lib/types';

// Assuming 'tabs' and 'icons' are defined somewhere or passed as props
const tabs = [
    { id: 'contacts', label: 'معلومات الاتصال', color: 'from-blue-500 to-blue-600' },
    { id: 'social', label: 'الروابط الاجتماعية', color: 'from-purple-500 to-purple-600' },
    { id: 'projects', label: 'المشاريع', color: 'from-green-500 to-green-600' },
    { id: 'skills', label: 'المهارات', color: 'from-orange-500 to-orange-600' }
];

// Type guards
function isContactInfo(item: FormDataType): item is ContactInfo { return (item as ContactInfo).details !== undefined; }
function isSocialLink(item: FormDataType): item is SocialLink { return (item as SocialLink).name !== undefined && (item as SocialLink).url !== undefined; }
function isProject(item: FormDataType): item is Project { return (item as Project).title !== undefined && (item as Project).description !== undefined; }
function isSkill(item: FormDataType): item is Skill { return (item as Skill).level !== undefined; }

const icons = {
  contacts: Users,
  social: Link,
  projects: FolderOpen,
  skills: Award,
};

interface DashboardContentProps {
  activeTab: 'contacts' | 'social' | 'projects' | 'skills';
  data: (FormDataType)[];
  searchTerm: string;
  handleEdit: (item: FormDataType) => void;
  handleDelete: (id: number | string) => void;
  skillCategories: SkillCategory[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab, data, searchTerm, handleEdit, handleDelete, skillCategories }) => {
  const filteredData = data.filter((item: FormDataType) =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderContent = () => {
    if (filteredData.length === 0 && searchTerm) {
      return (
        <div className="text-center py-20 text-gray-300">
          <div className="bg-gray-800 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
          <p className="text-gray-400 mb-6">لم يتم العثور على عناصر تطابق بحثك</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'contacts':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item, i) => isContactInfo(item) && <ContactCard key={i} contact={item} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>
        );
      case 'social':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item, i) => isSocialLink(item) && <SocialLinkCard key={i} social={item} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>
        );
      case 'projects':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredData.map((item, i) => isProject(item) && <ProjectCard key={i} project={item} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>
        );
      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((item, i) => isSkill(item) && <SkillCard key={i} skill={item} skillCategories={skillCategories} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>
        );
      default:
        return null;
    }
  };

  const currentTab = icons[activeTab];

  return (
    <div className="bg-gray-800 rounded-3xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="p-6 lg:p-8 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${tabs.find(t => t.id === activeTab)?.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            {React.createElement(currentTab, { className: "w-6 h-6 text-white" })}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100">{tabs.find(t => t.id === activeTab)?.label}</h2>
            <p className="text-gray-400">إدارة وتنظيم {tabs.find(t => t.id === activeTab)?.label} بطريقة احترافية</p>
          </div>
        </div>
      </div>
      <div className="p-6 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;