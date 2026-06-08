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

const ogImage =
  'https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/v1774709605/MaunakeaSunset_ouuchw.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://braun-steven.de'),
  title: 'Steven | Portfolio',
  description:
    'Steven Braun – dualer Informatikstudent aus Bad Mergentheim. Reisegeschichten, Fahrradabenteuer, Sport und Projekte über Informatik, Disziplin und kontinuierliches Lernen.',
  openGraph: {
    title: 'Steven | Portfolio',
    description:
      'Steven Braun – dualer Informatikstudent aus Bad Mergentheim. Reisegeschichten, Fahrradabenteuer, Sport und Projekte über Informatik, Disziplin und kontinuierliches Lernen.',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven | Portfolio',
    description:
      'Steven Braun – dualer Informatikstudent aus Bad Mergentheim. Reisegeschichten, Fahrradabenteuer, Sport und Projekte über Informatik, Disziplin und kontinuierliches Lernen.',
    images: [ogImage],
  },
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
