import { cn } from '@/lib/utils';

type TechBadgeProps = {
  label: string;
  className?: string;
};

/**
 * Pill-Badge für einen Tech-Stack-Eintrag. Farben stammen aus dem
 * bestehenden `.tag`-Muster: Navy auf 8 % Navy-Fläche.
 */
export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <li
      className={cn(
        'inline-flex items-center rounded-full bg-[rgba(15,47,95,0.08)] px-2.5 py-1',
        'text-xs font-medium leading-none text-primary',
        className,
      )}
    >
      {label}
    </li>
  );
}

type TechBadgeListProps = {
  items: readonly string[];
  /** Beschriftet die Liste für Screenreader. */
  label?: string;
};

/** Semantische Liste aller Tech-Badges eines Projekts. */
export function TechBadgeList({
  items,
  label = 'Verwendete Technologien',
}: TechBadgeListProps) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((item) => (
        <TechBadge key={item} label={item} />
      ))}
    </ul>
  );
}
