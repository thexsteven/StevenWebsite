import { Suspense } from 'react';
import Link from 'next/link';

import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectGridSkeleton } from '@/components/projects/ProjectCardSkeleton';
import { getProjectsWithStats } from '@/lib/projects';

/** Kuratierte Karten auf der Startseite. Der Rest lebt auf `/projekte`. */
const HOME_PROJECT_COUNT = 3;

/**
 * Die drei vordersten Projekte plus GitHub-Live-Daten. Eigene async-Komponente,
 * damit `<Suspense>` währenddessen das Skeleton in identischen Maßen zeigt.
 */
async function FeaturedProjectsContent() {
  const projects = await getProjectsWithStats();

  if (projects.length === 0) {
    return (
      <p className="home-empty">
        Die Projektgalerie füllt sich gerade – die ersten Repositories landen
        hier in Kürze.
      </p>
    );
  }

  // `getProjectsWithStats` sortiert Featured zuerst, dann nach `order`. Auf der
  // Startseite stehen die drei gleichwertig nebeneinander: das zweispaltige
  // Featured-Layout würde die Reihe aufbrechen, die hier die Aussage trägt.
  const featured = projects
    .slice(0, HOME_PROJECT_COUNT)
    .map((project) => ({ ...project, featured: false }));

  return <ProjectGrid projects={featured} />;
}

export function FeaturedProjects() {
  return (
    <section
      id="projekte"
      className="home-section home-projects"
      aria-labelledby="home-projekte-title"
    >
      <div className="home-shell">
        <header className="home-head">
          <p className="home-kicker">Projekte</p>
          <h2 id="home-projekte-title" className="home-title">
            Woran ich gerade baue.
          </h2>
          <p className="home-intro">
            Drei Arbeiten, die zeigen, wie ich denke – mit Live-Daten direkt aus
            GitHub: Sprachverteilung, Sterne und der letzte Commit.
          </p>
        </header>

        <Suspense
          fallback={
            <ProjectGridSkeleton
              count={HOME_PROJECT_COUNT}
              featuredCount={0}
            />
          }
        >
          <FeaturedProjectsContent />
        </Suspense>

        <p className="home-more">
          <Link href="/projekte" className="home-link">
            Alle Projekte ansehen
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
