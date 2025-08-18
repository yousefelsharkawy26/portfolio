// components/resume-download.tsx
'use client'; // Add this at the top

import { Download } from 'lucide-react';
import { MotionButton } from './ui/motion/motion-button';

interface ResumeDownloadProps {
  resumeUrl: string;
}

export const ResumeDownload = ({ resumeUrl }: ResumeDownloadProps) => {
  const handleDownload = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <MotionButton onClick={handleDownload} className="flex items-center space-x-2">
      <Download size={16} />
      <span>Download Resume</span>
    </MotionButton>
  );
};