// components/social-links.tsx
import { Github, Linkedin } from 'lucide-react';

interface SocialLinksProps {
  github: string;
  linkedin: string;
}

export const SocialLinks = ({ github, linkedin }: SocialLinksProps) => {
  return (
    <div className="flex space-x-4">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github size={24} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
      </a>
    </div>
  );
};