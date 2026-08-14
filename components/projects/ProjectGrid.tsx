import type { ProjectWithStats } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PROJECT_GRID_CLASSNAME } from '@/components/projects/layout';

type ProjectGridProps = {
  projects: readonly ProjectWithStats[];
};

/**
 * Responsives Grid der Projektkarten.
 *
 * Den Scroll-Reveal löst bewusst jede Karte für sich aus, nicht dieses
 * Grid: In einer Spalte wird der Container über 4000 px hoch, und ein
 * Schwellwert auf einem so hohen Element greift erst weit hinter dem
 * Sektionsanfang. Die Staffelung entsteht stattdessen über einen
 * Versatz pro Spaltenposition in der Karte selbst.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <div className={PROJECT_GRID_CLASSNAME}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
