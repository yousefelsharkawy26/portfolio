import React from 'react';
import { Plus, Search, Users, Link, FolderOpen, Award } from 'lucide-react';
import { TabType } from '@/lib/types';

const icons = {
  contacts: Users,
  social: Link,
  projects: FolderOpen,
  skills: Award,
};

interface DashboardHeaderProps {
  activeTab: string;
  tabs: { id: TabType; label: string; count: number; color: string }[];
  setActiveTab: (tab: TabType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setShowAddForm: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, tabs, setActiveTab, searchTerm, setSearchTerm, setShowAddForm }) => {
  return (
    <div className="hidden lg:block bg-gray-800 rounded-3xl shadow-xl border border-gray-700 p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Database Management Dashboard
          </h1>
          <p className="text-gray-400 text-lg">إدارة شاملة ومتقدمة لقاعدة البيانات مع واجهة عصرية وسهلة الاستخدام</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <Plus className="w-6 h-6" />
          <span>إضافة عنصر جديد</span>
        </button>
      </div>
      <div className="relative mb-8">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
        <input
          type="text"
          placeholder="ابحث في جميع البيانات..."
          className="w-full pr-14 pl-6 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const Icon = icons[tab.id as keyof typeof icons];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base">{tab.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                activeTab === tab.id
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeader;