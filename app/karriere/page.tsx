import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { StudyPreview } from '@/components/StudyPreview';

export const metadata: Metadata = {
  title: 'Karriere-Übersicht | Steven',
  description: 'Theorie- und Praxisphasen meines dualen Informatik-Studiums an der DHBW Mosbach: Module, Lernnotizen und Praxis-Einblicke.',
};

export default function KarriereHub() {
  return (
    <section className="story-detail" aria-labelledby="career-hub-title">
      <Breadcrumb href="/#werdegang" label="← Zurück zum Werdegang" />
      <StoryDetailHeader
        kicker="Karriere · DHBW Mosbach"
        titleId="career-hub-title"
        title="Studium im Überblick"
        meta="Duales Studium Informatik"
        summary="Was steckt hinter den Modulen? Hier findest du Themen, Übungen und Lernprojekte aus meinen Theoriephasen sowie Einblicke in die Praxis. Ausgewählte gefilterte Notion-Ansichten führen direkt zu meinen Lernnotizen."
      />
      <section className="career-hub-section" aria-labelledby="phases-title">
        <h2 id="phases-title">Theorie- und Praxissemester</h2>
        <StudyPreview />
      </section>
      <p>Die Übersichten zeigen die dokumentierten Schwerpunkte meines Lern-Hubs. Sie sind kein vollständiges Modulhandbuch. Weitere Studienphasen werden ergänzt.</p>
      <StoryPagination actions={[
        { href: '/#werdegang', label: 'Zur Startseite', ghost: true },
        { href: '/karriere/semester-1', label: 'Semester 1 ansehen' },
      ]} />
    </section>
  );
}
