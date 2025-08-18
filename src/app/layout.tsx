// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { Analytics } from '@vercel/analytics/react';
import { PageTransition } from '@/components/animations/page-transition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Full-stack developer portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider>
          <PageTransition>
            {children}
            <Analytics />
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}