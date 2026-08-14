import { Suspense } from 'react';

import { SectionHead } from '@/components/SectionHead';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectGridSkeleton } from '@/components/projects/ProjectCardSkeleton';
import { getProjectsWithStats } from '@/lib/projects';

/**
 * Lädt kuratierte Projekte plus GitHub-Live-Daten. Steht in einer eigenen
 * async-Komponente, damit `<Suspense>` währenddessen das Skeleton zeigt.
 */
async function ProjectsContent() {
  const projects = await getProjectsWithStats();

  if (projects.length === 0) {
    return (
      <p className="max-w-prose text-muted">
        Die Projektgalerie füllt sich gerade – die ersten Repositories landen
        hier in Kürze.
      </p>
    );
  }

  return <ProjectGrid projects={projects} />;
}

export function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <SectionHead
        kicker="Projekte"
        titleId="projects-title"
        title="Woran ich gerade baue."
        intro="Eine kuratierte Auswahl – ergänzt um Live-Daten direkt aus GitHub: Sterne, Sprachverteilung und der letzte Commit."
      />

      <Suspense fallback={<ProjectGridSkeleton count={3} featuredCount={1} />}>
        <ProjectsContent />
      </Suspense>
    </section>
  );
}
