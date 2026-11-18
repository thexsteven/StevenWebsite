import type { Metadata } from 'next';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Projects } from '@/components/sections/Projects';

export const metadata: Metadata = {
  title: 'Projekte | Steven',
  description:
    'Stevens Lerntrainer, Webanwendungen und Studienprojekte mit Einblicken in die Umsetzung, öffentlichen Repositories und Live-Demos.',
};

export default function ProjektePage() {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">
        <div className="home-hub-top">
          <Breadcrumb href="/#projekte" label="← Zurück zur Startseite" />
        </div>
        <Projects />
      </main>
      <SiteFooter />
    </>
  );
}
