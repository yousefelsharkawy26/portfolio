// app/projects/[id]/page.tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ProjectDetail() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container py-20">
          <h1 className="text-4xl font-bold text-white mb-8">Project Details</h1>
          <p className="text-gray-300">Project details coming soon...</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}