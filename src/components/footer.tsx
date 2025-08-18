// components/footer.tsx
import { SocialLinks } from './social-links';
import { ResumeDownload } from './resume-download';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <SocialLinks 
              github="https://github.com/yousefelsharkawy26" 
              linkedin="https://www.linkedin.com/in/yousefelsharkawy984" 
            />
          </div>
          <ResumeDownload resumeUrl="/resume.pdf" />
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};