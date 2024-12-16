// app/layout.tsx
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { getTheme } from '@/lib/theme';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Level Up',
  description: 'Votre site e-commerce de matériel informatique',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = await getTheme();

  if (!theme) {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  return (
    <html lang="fr" className={theme === 'dark' ? 'dark' : ''}>
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}