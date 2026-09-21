import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { StudyModules } from '@/components/StudyModules';

export const metadata: Metadata = {
  title: 'Praxis-Insights | Steven',
  description: 'Daten verstehen, Annahmen prüfen und Arbeit dokumentieren: Einblicke in meine Praxisphase.',
};

export default function Praxis1() {
  return (
    <section className="story-detail" aria-labelledby="insights-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere-Übersicht" />
      <StoryDetailHeader
        kicker="Praxisphase"
        titleId="insights-title"
        title="Praxis-Insights"
        meta="1. Projektarbeit"
        summary="Wie ich mit Daten, offenen Fragen und fachlichen Annahmen arbeite. Der Rückblick zeigt meine Arbeitsweise; Unternehmensdaten und interne Projektdetails bleiben vertraulich."
      />
      <StudyModules phase="praxis-1" />
      <StoryPagination actions={[
        { href: '/karriere/semester-1', label: 'Theorie-Semester 1', ghost: true },
        { href: '/karriere', label: 'Alle Studienphasen' },
      ]} />
    </section>
  );
}
