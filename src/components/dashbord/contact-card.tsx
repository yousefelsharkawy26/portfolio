import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { ContactInfo } from '@/lib/types';
import { DynamicHeroIcon } from '../ui/dynamic_icons';

interface ContactCardProps {
  contact: ContactInfo;
  onEdit: (contact: ContactInfo) => void;
  onDelete: (id: number) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="group bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div 
              className={"w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"}
            >
              <DynamicHeroIcon name={contact.icon} className="w-5 h-5"/>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-100 text-lg mb-1 truncate">{contact.title}</h3>
              <p className="text-gray-400 text-sm truncate">{contact.details}</p>
            </div>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(contact)}
              className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        {contact.link && (
          <a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-200 text-sm font-medium bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            <span>فتح الرابط</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactCard;