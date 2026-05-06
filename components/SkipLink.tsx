type SkipLinkProps = {
  targetId?: string;
  children?: React.ReactNode;
};

export function SkipLink({
  targetId = 'main',
  children = 'Zum Inhalt springen',
}: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {children}
    </a>
  );
}
