import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { SkipLink } from '@/components/SkipLink';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Steven | Portfolio',
  description: 'Persönliche Portfolio-Website von Steven',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={playfair.variable}>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
