import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { StudyModules } from '@/components/StudyModules';

export const metadata: Metadata = {
  title: 'Theorie-Semester 2 | Steven',
  description: 'Die Lern-Hub-Themen meines zweiten Theorie-Semesters: Algorithmen, Webprojekte, Analysis, Java und Digitaltechnik.',
};

export default function Semester2() {
  return (
    <section className="story-detail" aria-labelledby="summary-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere-Übersicht" />
      <StoryDetailHeader
        kicker="Theoriephase · DHBW Mosbach"
        titleId="summary-title"
        title="Theorie-Semester 2"
        meta="Informatik · 7 Module"
        summary="Algorithmen vertiefen, Webprojekte weiterdenken und digitale Systeme verstehen. Ein Einblick in meine Lernnotizen: Je nach Modul sind bereits ausführliche Lerneinheiten oder erste kurze Notizen dokumentiert."
      />
      <StudyModules phase="semester-2" />
      <StoryPagination actions={[
        { href: '/karriere/semester-1', label: 'Theorie-Semester 1', ghost: true },
        { href: '/karriere', label: 'Alle Studienphasen' },
      ]} />
    </section>
  );
}
