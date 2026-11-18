import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';
import { StudyModules } from '@/components/StudyModules';

export const metadata: Metadata = {
  title: 'Theorie-Semester 3 | Steven',
  description: 'Sieben Fächer an der DHBW Mosbach, von relationalen Datenbanken und Kellerautomaten bis zu Mikrocontrollern, Softwareentwurf und Webentwicklung.',
};

export default function Semester3() {
  return (
    <section className="story-detail" aria-labelledby="summary-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere-Übersicht" />
      <StoryDetailHeader
        kicker="Theoriephase · DHBW Mosbach"
        titleId="summary-title"
        title="Theorie-Semester 3"
        meta="Angewandte Informatik · 7 Fächer"
        summary="Wie reagiert ein Mikrocontroller auf einen Tastendruck? Wie lässt sich ein Warenkorb in UML modellieren? Hier findest du Aufgaben, Entwürfe und Lernprojekte aus meinen sieben Fächern."
      />
      <StudyModules phase="semester-3" />
      <StoryPagination actions={[
        { href: '/karriere/semester-2', label: 'Theorie-Semester 2', ghost: true },
        { href: '/karriere', label: 'Alle Studienphasen' },
        { href: '/karriere/klausurvorbereitung-winter-2026', label: 'Lernplan für die Klausuren' },
      ]} />
    </section>
  );
}
