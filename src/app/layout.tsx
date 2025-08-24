// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { Analytics } from '@vercel/analytics/react';
import { PageTransition } from '@/components/animations/page-transition';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Full-stack developer portfolio',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Portfolio',
    description: 'Full-stack developer portfolio',
    type: 'website',
    url: 'https://example.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio',
    description: 'Full-stack developer portfolio',
  },
  icons: '/favicon.svg'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark light',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0f172a' }, { media: '(prefers-color-scheme: light)', color: '#ffffff' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" data-scroll-behavior="smooth">
      <body className={inter.className + ' antialiased'} suppressHydrationWarning={true}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-gray-800 focus:text-white focus:px-3 focus:py-2">Skip to content</a>
          <SpeedInsights/>
          <ThemeProvider>
            <PageTransition>
              <main id="main">
                {children}
              </main>
              <Analytics />
            </PageTransition>
          </ThemeProvider>
      </body>
    </html>
  );
}