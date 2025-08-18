// app/about/page.tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResumeDownload } from '@/components/resume-download';
import { Timeline } from '@/components/about/timeline';
import { FadeInUp } from '@/components/ui/motion/fade-in-up';

export default function About() {
  const timelineItems = [
    {
      year: "2021 - Present",
      title: "Full-Stack Developer",
      description: "Developing web applications using .NET, Node.js, and React. Working on POS systems and healthcare software."
    },
    {
      year: "2020 - 2021",
      title: "Junior Developer",
      description: "Started career focusing on front-end development with React and TypeScript."
    },
    {
      year: "2019 - 2020",
      title: "Intern Developer",
      description: "Gained experience with web technologies and software development practices."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container py-20">
          <FadeInUp>
            <h1 className="text-4xl font-bold text-white mb-8">
              About Me
            </h1>
          </FadeInUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <FadeInUp delay={0.2}>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 mb-4">
                    I am a full-stack developer with 3 years of experience building web applications using modern technologies.
                    My expertise includes .NET C#, Node.js, React, and various databases.
                  </p>
                  <p className="text-gray-300 mb-4">
                    I have worked on projects like POS systems and dental care management software.
                    I am passionate about creating efficient, scalable applications.
                  </p>
                </div>
              </FadeInUp>
              
              <FadeInUp delay={0.4} className="mt-8">
                <ResumeDownload resumeUrl="/resume.pdf" />
              </FadeInUp>
            </div>
            
            <div>
              <FadeInUp delay={0.3}>
                <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
                <Timeline items={timelineItems} />
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}