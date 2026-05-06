import type { Metadata } from 'next';
import {
  Playfair_Display,
  Bricolage_Grotesque,
  Cormorant_Garamond,
  DM_Mono,
} from 'next/font/google';
import { SkipLink } from '@/components/SkipLink';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
  weight: ['300', '400'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400'],
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
    <html
      lang="de"
      className={`${playfair.variable} ${bricolage.variable} ${cormorant.variable} ${dmMono.variable}`}
    >
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
