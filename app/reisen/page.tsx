import type { Metadata } from 'next';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Travel } from '@/components/sections/Travel';

export const metadata: Metadata = {
  title: 'Reisen | Steven',
  description:
    'Reisegeschichten von Steven Braun: sechs Wochen Sprachreise auf Hawaii und eine Fahrradtour von Konstanz nach Cannes über die Alpen.',
};

export default function ReisenPage() {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">
        <div className="home-hub-top">
          <Breadcrumb href="/#beyond" label="← Zurück zur Startseite" />
        </div>
        <Travel />
      </main>
      <SiteFooter />
    </>
  );
}
