import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { CareerHubCard } from '@/components/CareerHubCard';

export const metadata: Metadata = {
  title: 'Karriere-Übersicht | Steven',
  description:
    'Karriere-Übersicht: Theorie- und Praxisphasen meines dualen Informatik-Studiums an der DHBW Mosbach.',
};

export default function KarriereHub() {
  return (
    <section className="story-detail" aria-labelledby="career-hub-title">
      <Breadcrumb href="/#career" label="← Zurück zur Startseite" />
      <StoryDetailHeader
        kicker="Karriere · DHBW Mosbach"
        titleId="career-hub-title"
        title="Studium im Überblick"
        meta="Duales Studium Informatik · ab Oktober 2025"
        summary="Theorie- und Praxisphasen wechseln sich im dualen Studium alle drei Monate ab. Hier sammle ich für jede Phase einen Rückblick: Lernstoff, praktische Anwendungen und – mit der Zeit – verwandte Projekte."
      />

      <section className="career-hub-section" aria-labelledby="theorie-title">
        <h2 id="theorie-title">Theoriephasen</h2>
        <ul className="career-hub-list">
          <li>
            <CareerHubCard
              href="/karriere/semester-1"
              kicker="Semester 1"
              title="Grundlagen & erstes Projekt"
              meta="Oktober 2025 – März 2026 · 7 Module"
            />
          </li>
          <li>
            <CareerHubCard
              href="/karriere/semester-2"
              kicker="Semester 2"
              title="Aktuell laufend"
              meta="März 2026 – Juli 2026"
            />
          </li>
          <li>
            <CareerHubCard
              kicker="Semester 3+"
              title="Folgt"
              meta="ab Oktober 2026"
            />
          </li>
        </ul>
      </section>

      <section className="career-hub-section" aria-labelledby="praxis-title">
        <h2 id="praxis-title">Praxisphasen</h2>
        <ul className="career-hub-list">
          <li>
            <CareerHubCard
              href="/karriere/praxis-1"
              kicker="Praxis 1"
              title="1. Projektarbeit"
              meta="Aufgaben, Tools, Learnings"
            />
          </li>
          <li>
            <CareerHubCard
              kicker="Praxis 2+"
              title="Folgt"
              meta="spätere Praxisphasen"
            />
          </li>
        </ul>
      </section>

      <StoryPagination
        actions={[
          { href: '/#career', label: 'Zur Startseite', ghost: true },
          { href: '/karriere/semester-1', label: 'Semester 1 ansehen' },
        ]}
      />
    </section>
  );
}
