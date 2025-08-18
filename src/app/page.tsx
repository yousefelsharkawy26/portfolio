// app/page.tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FadeInUp } from '@/components/ui/motion/fade-in-up';
import { StaggerChildren } from '@/components/ui/motion/stagger-children';
import { HeroAnimation } from '@/components/animations/hero-animation';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { MotionBox } from '@/components/ui/motion/motion-box';
import { MotionText } from '@/components/ui/motion/motion-text';
import { MotionButton } from '@/components/ui/motion/motion-button';
import { MotionLink } from '@/components/ui/motion/motion-link';
import ClientOnly from "@/components/client-only"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative container py-20 text-center min-h-screen flex items-center">
          <HeroAnimation />
          
          <div className="relative z-10 w-full">
            <ClientOnly>
              <FadeInUp delay={0.2}>
                <MotionText 
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  Full-Stack Developer
                </MotionText>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <MotionText 
                  className="text-xl mb-8 max-w-2xl mx-auto"
                  >
                  Building modern web applications with .NET, Node.js, React, and more.
                </MotionText>
              </FadeInUp>
              
              <FadeInUp delay={0.6}>
                <MotionLink href="/projects">
                  <MotionButton 
                    variant="primary" 
                    className="px-6 py-3"
                    >
                    <span className="text-lg">View My Work</span>
                  </MotionButton>
                </MotionLink>
              </FadeInUp>
            </ClientOnly>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-16 bg-gray-800">
          <div className="container">
            <ClientOnly>
              <ScrollReveal delay={0.1}>
                <MotionText 
                  className="text-3xl font-bold text-white mb-12 text-center"
                >
                  My Skills
                </MotionText>
              </ScrollReveal>
              <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: '.NET C#', icon: '🟣' },
                  { name: 'Node.js', icon: '🟢' },
                  { name: 'React', icon: '⚛️' },
                  { name: 'SQL', icon: '🗄️' },
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'Express', icon: '🚂' },
                  { name: 'TypeScript', icon: '🔷' },
                  { name: 'Tailwind', icon: '🎨' }
                ].map((skill) => (
                  <MotionBox
                  key={skill.name}
                  className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition-colors"
                    whileHover={{ y: -10 }}
                  >
                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <MotionText className="text-white font-medium">
                      {skill.name}
                    </MotionText>
                  </MotionBox>
                ))}
              </StaggerChildren>
            </ClientOnly>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}