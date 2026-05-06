import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Hawaii · Abschluss | Steven',
  description:
    'Hawaii Sprachreise – Abschluss: EF Graduation, C1-Zertifikat und der letzte Tag in Honolulu.',
};

export default function HawaiiAbschluss() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Abschluss"
        meta="14. April 2025 · Honolulu"
        summary="C1 bestanden. Der letzte Tag war mehr Gym als Graduation – und das war genau richtig."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            { label: 'Abschluss', value: 'EF Language School · Honolulu' },
            { label: 'Zertifikat', value: 'C1 Academic English' },
            {
              label: 'Highlight des Tages',
              value: 'Amerikanisches Gym – vorher und nachher',
            },
          ]}
        />

        <div className="album-grid">
          <div className="album-section">
            <h2>Die Graduation</h2>
            <p>
              Kurz. Zertifikat, Foto, Rede – vorbei. Keine große Feier, kein
              langer Abend. Aber das Zertifikat in der Hand zu halten ist
              trotzdem was.
            </p>
          </div>

          <div className="album-text">
            <p>
              C1 Academic English nach 6 Wochen Vollzeit-Englisch. Vorlesungen,
              Präsentationen, Gespräche – alles auf Englisch. Was sich wirklich
              verändert hat, war nicht die Grammatik. Das kannte ich vorher
              schon grob. Es war das Sprechen. Der Moment, in dem man aufgehört
              hat, im Kopf zu übersetzen.
            </p>
          </div>

          <div className="album-section">
            <h2>Das Gym</h2>
            <p>
              Ehrlich gesagt spannender als die Graduation. Amerikanische Gyms
              sind anders – größer, lauter, irgendwie primitiver. Wir waren
              vorher hin und danach wieder hin. Dazwischen lag die Graduation.
            </p>
          </div>

          <div className="album-text">
            <p>
              Das sagt wahrscheinlich mehr über den Tag aus als jede offizielle
              Beschreibung.
            </p>
          </div>

          <div className="album-section">
            <h2>Was bleibt</h2>
          </div>

          <div className="album-text">
            <p>
              Sechs Wochen auf einer Insel im Pazifik, tausend Kilometer vom
              nächsten Kontinent entfernt. Leute aus Korea, Japan, Brasilien,
              Frankreich, der Schweiz. Jeden Tag Englisch, jeden Abend irgendwas
              Neues.
            </p>
            <p>
              Ich bin besser in Englisch geworden – Plan hat funktioniert. Was
              wirklich hängen bleibt: wie man sich arrangiert, wenn man niemanden
              kennt. Wie viel man versteht, wenn man einfach offen reingeht. Wie
              wenig es braucht, damit ein Abend gut wird.
            </p>
            <p>
              Und dass man auf Big Island kurz Angst hat, der Mietwagen schafft
              die Straße runter nicht mehr, bevor es dunkel wird.
            </p>
          </div>
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          {
            href: '/reisen/hawaii/essen-kultur',
            label: 'Vorheriges Kapitel: Essen & Kultur',
            ghost: true,
          },
          { href: '/#travel', label: 'Zurück zur Übersicht' },
        ]}
      />
    </section>
  );
}
