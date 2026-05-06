type FooterVariant = 'default' | 'love';

export function SiteFooter({
  variant = 'default',
}: {
  variant?: FooterVariant;
}) {
  const text =
    variant === 'love' ? 'Privater Bereich.' : 'Alle Rechte vorbehalten.';

  return (
    <footer className="site-footer" role="contentinfo">
      <p>&copy; 2026 Steven. {text}</p>
    </footer>
  );
}
