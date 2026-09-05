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
  icons: { icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="%2314161A"/><text x="12" y="35" fill="%23F4F1EA" font-size="36" font-family="Georgia">S</text></svg>' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de" className={`${fraunces.variable} ${geist.variable}`}><body><SkipLink /><SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /><ScrollExperience /></body></html>;
}
