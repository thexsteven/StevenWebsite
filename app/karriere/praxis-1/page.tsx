import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Praxis-Insights | Steven',
  description:
    'Praxis-Insights: Aufgaben, Verantwortungen und Learnings aus der Praxisphase.',
};

export default function Praxis1() {
  return (
    <section className="story-detail" aria-labelledby="insights-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere‑Übersicht" />
      <StoryDetailHeader
        kicker="Praxisphase"
        titleId="insights-title"
        title="Praxis‑Insights"
        meta="1. Projektarbeit"
        summary="Aufgaben, Teamarbeit, Tools und die wichtigsten Learnings aus der Praxis."
      />

      <div className="story-content">
        <p>
          Beschreibe hier deine Aufgaben, dein Team‑Setup und welche Tools du
          genutzt hast. Betone Ergebnisse und persönliche Entwicklung.
        </p>
        <p>
          Ergänze gern Beispiele: Anforderungen analysieren, Tests schreiben,
          Features umsetzen.
        </p>
      </div>

      <div className="story-media-grid" aria-label="Praxisphase">
        <div className="media-tile">Platzhalter: Projekt-Skizze</div>
        <div className="media-tile">Platzhalter: Team-Setup</div>
        <div className="media-tile">Platzhalter: Tool-Stack</div>
      </div>

      <StoryPagination
        actions={[
          {
            href: '/karriere/semester-1',
            label: 'Zur Semester‑Zusammenfassung',
            ghost: true,
          },
          { href: '/#career', label: 'Zur Übersicht' },
        ]}
      />
    </section>
  );
}
