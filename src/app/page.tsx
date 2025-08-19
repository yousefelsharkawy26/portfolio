import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import { Footer, Header } from "@/components/header";
import ProjectsSection from "@/components/project-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}