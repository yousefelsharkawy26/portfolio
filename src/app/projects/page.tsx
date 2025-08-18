// app/projects/page.tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProjectCard } from '@/components/project-card';
import { StaggerChildren } from '@/components/animations/stagger-children';
import { FadeInUp } from '@/components/animations/fade-in-up';

// Placeholder data until we integrate Strapi
const projects = [
  {
    id: '1',
    title: 'POS System',
    description: 'Point of Sale system built with .NET and React',
    tech: ['.NET', 'React', 'SQL Server'],
    imageUrl: '/images/placeholder.jpg',
  },
  {
    id: '2',
    title: 'Dental Care System',
    description: 'Patient management system for dental clinics',
    tech: ['Node.js', 'Express', 'MongoDB'],
    imageUrl: '/images/placeholder.jpg',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container py-20">
          <FadeInUp>
            <h1 className="text-4xl font-bold text-white mb-8">
              Projects
            </h1>
          </FadeInUp>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </StaggerChildren>
        </section>
      </main>
      <Footer />
    </div>
  );
}