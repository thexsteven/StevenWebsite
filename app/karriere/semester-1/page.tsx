import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { StudyModules } from '@/components/StudyModules';

export const metadata: Metadata = {
  title: 'Theorie-Semester 1 | Steven',
  description: 'Sieben Module meines ersten Theorie-Semesters: Themen, Lernprojekte und ausgewählte Notion-Lernnotizen.',
};

export default function Semester1() {
  return (
    <section className="story-detail" aria-labelledby="summary-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere-Übersicht" />
      <StoryDetailHeader
        kicker="Theoriephase · DHBW Mosbach"
        titleId="summary-title"
        title="Theorie-Semester 1"
        meta="Informatik · 7 Module"
        summary="Mathematische Grundlagen, erste eigene Programme und das Zusammenspiel von Web, Hardware und Logik. Diese Übersicht zeigt die dokumentierten Themen und Projekte aus meinem Lern-Hub."
      />
      <StudyModules phase="semester-1" />
      <StoryPagination actions={[
        { href: '/karriere', label: 'Alle Studienphasen', ghost: true },
        { href: '/karriere/praxis-1', label: 'Praxis-Einblicke' },
        { href: '/karriere/semester-2', label: 'Theorie-Semester 2' },
      ]} />
    </section>
  );
}
