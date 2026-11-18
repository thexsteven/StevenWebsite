import type { Metadata } from 'next';
import Link from 'next/link';
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
      <p><Link href="/karriere/klausurvorbereitung-winter-2026" className="home-link">Mein Lernplan für die Klausuren Winter 2026 →</Link></p>
      <section className="career-hub-section" aria-labelledby="international-title">
        <h2 id="international-title">Fachenglisch und Auslandssemester</h2>
        <p>Im Fachenglisch übe ich, technische Begriffe verständlich auszusprechen, einen Vortrag auf Englisch zu gliedern und auf Rückfragen einzugehen.</p>
        <p>Für meine Auslandsplanung habe ich die Studienangebote in Seoul, Taipeh und Bangkok verglichen. Für die Mahidol University habe ich Kurse dem Studienplan in Mosbach gegenübergestellt.</p>
        <Link href="/projekte#project-auslandssemester-hub-title" className="home-link">Zum Auslandssemester-Hub →</Link>
      </section>
      <StoryPagination actions={[
        { href: '/#werdegang', label: 'Zur Startseite', ghost: true },
        { href: '/karriere/semester-1', label: 'Semester 1 ansehen' },
      ]} />
    </section>
  );
}
