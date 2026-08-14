import { cn } from '@/lib/utils';
import {
  CARD_SHADOW_CLASSNAME,
  CARD_SHELL_CLASSNAME,
  FEATURED_SPAN_CLASSNAME,
  PROJECT_GRID_CLASSNAME,
} from '@/components/projects/layout';

/** Graue Fläche im Skeleton – gleiche Haarlinie wie `--color-border`. */
function Bar({ className }: { className?: string }) {
  return (
    <span
      className={cn('block rounded-full bg-line', className)}
      aria-hidden="true"
    />
  );
}

type ProjectCardSkeletonProps = {
  featured?: boolean;
};

/**
 * Platzhalter während die Live-Daten geladen werden. Übernimmt Rahmen,
 * Radien und Bildverhältnis der echten Karte, damit nichts springt.
 */
export function ProjectCardSkeleton({
  featured = false,
}: ProjectCardSkeletonProps) {
  return (
    <div
      className={cn(
        CARD_SHELL_CLASSNAME,
        CARD_SHADOW_CLASSNAME,
        'motion-safe:animate-pulse',
        featured && FEATURED_SPAN_CLASSNAME,
      )}
    >
      <div
        className="aspect-video w-full rounded-t-[var(--radius-md)] bg-[rgba(15,47,95,0.06)]"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <Bar className="h-5 w-3/5" />
          <Bar className="h-3.5 w-2/5" />
        </div>

        <div className="flex flex-col gap-2">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-11/12" />
          <Bar className="h-3 w-4/5" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Bar className="h-6 w-20" />
          <Bar className="h-6 w-16" />
          <Bar className="h-6 w-24" />
        </div>

        <Bar className="h-1.5 w-full" />

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
          <Bar className="h-3 w-16" />
          <Bar className="h-3 w-24" />
          <Bar className="ml-auto h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

type ProjectGridSkeletonProps = {
  /** Anzahl der Platzhalterkarten. */
  count?: number;
  /** Wie viele davon als Featured-Karte (zwei Spalten) erscheinen. */
  featuredCount?: number;
};

/** Skeleton-Variante des kompletten Grids – Fallback für `<Suspense>`. */
export function ProjectGridSkeleton({
  count = 3,
  featuredCount = 1,
}: ProjectGridSkeletonProps) {
  return (
    <div className={PROJECT_GRID_CLASSNAME} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton key={index} featured={index < featuredCount} />
      ))}
    </div>
  );
}
