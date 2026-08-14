import type { Metadata } from 'next';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Sport } from '@/components/sections/Sport';

export const metadata: Metadata = {
  title: 'Sport | Steven',
  description:
    'Ausdauer, Kraft und Mindset – warum Disziplin im Training und Disziplin beim Bauen von Software dieselbe Fähigkeit sind.',
};

export default function SportPage() {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">
        <div className="home-hub-top">
          <Breadcrumb href="/#beyond" label="← Zurück zur Startseite" />
        </div>
        <Sport />
      </main>
      <SiteFooter />
    </>
  );
}
