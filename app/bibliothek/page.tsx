import type { Metadata } from 'next';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SectionHead } from '@/components/SectionHead';
import { BookLibrary } from '@/components/sections/BookLibrary';

export const metadata: Metadata = {
  title: 'Bibliothek | Steven',
  description:
    'Bücher, die meinen Blick auf Lernen, Disziplin und Leben geprägt haben – mit Zitaten und Platz für Diskussion.',
};

export default function BibliothekPage() {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">
        <div className="home-hub-top">
          <Breadcrumb href="/#beyond" label="← Zurück zur Startseite" />
        </div>
        <section
          id="bibliothek"
          className="bibliothek"
          aria-labelledby="bibliothek-title"
        >
          <SectionHead
            kicker="Bibliothek"
            titleId="bibliothek-title"
            title="Was meinen Blick geprägt hat."
            intro="Bücher über Lernen, Disziplin und Leben – jedes mit den Zitaten, die bei mir hängen geblieben sind."
          />
          <BookLibrary />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
