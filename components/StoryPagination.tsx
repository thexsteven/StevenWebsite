type Action = {
  href: string;
  label: string;
  ghost?: boolean;
};

type StoryPaginationProps = {
  ariaLabel?: string;
  actions: Action[];
};

export function StoryPagination({
  ariaLabel = 'Weiter',
  actions,
}: StoryPaginationProps) {
  return (
    <nav className="story-pagination" aria-label={ariaLabel}>
      {actions.map((action) => (
        <a
          key={`${action.href}|${action.label}`}
          className={action.ghost ? 'btn btn-ghost' : 'btn'}
          href={action.href}
        >
          {action.label}
        </a>
      ))}
    </nav>
  );
}
