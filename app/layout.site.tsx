import type { Metadata } from 'next';
import { Fraunces, Geist } from 'next/font/google';
import { SkipLink } from '@/components/SkipLink';
import { SiteHeader, SiteFooter } from '@/components/editorial/SiteChrome';
import { ScrollExperience } from '@/components/editorial/ScrollExperience';
import '@/lib/scrollcraft/scrollcraft.css';
import './editorial.css';
import './society.css';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['300', '400', '500', '600'], style: ['normal', 'italic'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-text', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://braun-steven.de'),
  title: { default: 'Steven Braun · Unterwegs und am Lernen', template: '%s · Steven Braun' },
  description: 'Reisegeschichten aus Hawaii und von einer Radtour über die Alpen. Dazu das duale Studium, Software und der Mensch dahinter.',
  robots: { index: false, follow: false },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de" className={`${fraunces.variable} ${geist.variable}`}><body><SkipLink /><SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /><ScrollExperience /></body></html>;
}
