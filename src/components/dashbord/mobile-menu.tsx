import React from 'react';
import { X, Menu, Users, Link, FolderOpen, Award, Plus } from 'lucide-react';
import { TabType } from '@/lib/types';

const icons = {
  contacts: Users,
  social: Link,
  projects: FolderOpen,
  skills: Award,
};

interface MobileMenuProps {
  tabs: { id: TabType; label: string; count: number; color: string }[];
  activeTab: string;
  setActiveTab: (tab: TabType) => void; // <--- This fixes the error
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setShowAddForm: (show: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ tabs, activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, setShowAddForm }) => {
  return (
    <div className="lg:hidden p-4 bg-gray-950">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          لوحة التحكم
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white transition-colors">
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="flex flex-col space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {tabs.map((tab) => {
              const Icon = icons[tab.id as keyof typeof icons];
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-sm">{tab.label}</span>
                  <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
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
          <button
            onClick={() => { setShowAddForm(true); setIsMobileMenuOpen(false); }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center space-x-3 shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة عنصر جديد</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;