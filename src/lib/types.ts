export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  technologies: string[];
  category: string;
  live_url: string;
  github_url: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface CategorySkills {
  title: string;
  skills: {
    name: string;
    level: number; // Percentage
  }[];
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactInfo {
  id: number;
  icon: string;
  title: string;
  details: string;
  link?: string;
  color: string; // Tailwind gradient classes
}
export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
  color: string; // Tailwind gradient classes
}

export interface Skill {
  id: number;
  name: string;
  level: number; // Percentage
  category_id: number;
}

export interface SkillCategory {
  id: number;
  title: string;
}

export type ProjectStatus = 'in-progress' | 'completed' | 'planned';
export type TabType = 'contacts' | 'social' | 'projects' | 'skills';
export type FormDataType = ContactInfo | SocialLink | Project | Skill;