import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Thailand Rundreise | Steven',
  description:
    'Thailand Rundreise – geplante Route von Bangkok über Koh Phangan, Koh Samui, Krabi und die Inseln um Koh Phi Phi bis nach Phuket. Reisebericht folgt.',
};

// ——— Etappen der geplanten Route ————————————————————————————————
// Platzhalter: Reihenfolge und Kurzbeschreibung stehen, Bilder und
// ausführliche Berichte folgen nach der Reise.
const STAGES = [
  {
    slug: 'bangkok',
    title: 'Bangkok',
    meta: 'Etappe 1 · Ankunft',
    text: 'Ankunft und erste Tage in der Hauptstadt: Tempel, Streetfood und der Sprung ins Getümmel, bevor es in den Süden geht.',
  },
  {
    slug: 'koh-phangan',
    title: 'Koh Phangan',
    meta: 'Etappe 2 · Golf von Thailand',
    text: 'Erste Insel im Golf von Thailand. Buchten, Dschungel im Inselinneren und der bekannteste Strand der Insel.',
  },
  {
    slug: 'koh-samui',
    title: 'Koh Samui',
    meta: 'Etappe 3 · Golf von Thailand',
    text: 'Die größere Nachbarinsel: Wasserfälle, Küstenstraße rund um die Insel und ein ruhigerer Gegenpol zu Koh Phangan.',
  },
  {
    slug: 'krabi',
    title: 'Krabi',
    meta: 'Etappe 4 · Andamanenküste',
    text: 'Wechsel auf die Westseite. Kalksteinfelsen, Railay Beach und die Ausgangsbasis für die Inseln in der Andamanensee.',
  },
  {
    slug: 'phi-phi-inseln',
    title: 'Inseln um Koh Phi Phi',
    meta: 'Etappe 5 · Andamanensee',
    text: 'Inselhopping rund um Koh Phi Phi: Buchten, Schnorchelstopps und die kleineren Inseln abseits der Hauptroute.',
  },
  {
    slug: 'phuket',
    title: 'Phuket',
    meta: 'Etappe 6 · Abschluss',
    text: 'Letzte Station und Abflugpunkt. Rückblick auf die Route zwischen Golf von Thailand und Andamanensee.',
  },
];

export default function ThailandPage() {
  return (
    <section className="story-detail" aria-labelledby="thailand-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise-Übersicht" />

      <StoryDetailHeader
        kicker="Reisen"
        titleId="thailand-title"
        title="Thailand Rundreise"
        meta="In Planung · Termin folgt"
        summary="Von Bangkok in den Süden: eine Route durch den Golf von Thailand und die Andamanensee. Diese Seite ist ein Platzhalter – Bilder, Karten und der ausführliche Reisebericht folgen nach der Reise."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            { label: 'Start', value: 'Bangkok' },
            { label: 'Ziel', value: 'Phuket' },
            { label: 'Etappen', value: '6 Stationen' },
            {
              label: 'Route',
              value: 'Golf von Thailand → Andamanensee',
            },
            { label: 'Status', value: 'In Planung' },
          ]}
        />
      </div>

      {STAGES.map((stage) => (
        <article key={stage.slug} id={stage.slug} className="story-stage">
          <div className="story-content">
            <h2 className="story-h2">{stage.title}</h2>
            <p className="story-meta">{stage.meta}</p>
            <p>{stage.text}</p>
            <p className="story-placeholder-note">
              Bilder und ausführlicher Bericht folgen.
            </p>
          </div>
        </article>
      ))}

      <StoryPagination
        ariaLabel="Weiter"
        actions={[
          { href: '/#travel', label: 'Zurück zur Reise-Übersicht', ghost: true },
        ]}
      />
    </section>
  );
}
