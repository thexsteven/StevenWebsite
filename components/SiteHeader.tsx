type NavItem = { href: string; label: string };
type Variant = 'home' | 'career' | 'travel-hawaii' | 'travel-cannes' | 'love';

type VariantConfig = {
  navLabel: string;
  logoHref: string;
  links: NavItem[];
};

const VARIANTS: Record<Variant, VariantConfig> = {
  home: {
    navLabel: 'Hauptnavigation',
    logoHref: '#top',
    links: [
      { href: '#about', label: 'Über mich' },
      { href: '#resume', label: 'Lebenslauf' },
      { href: '#skills', label: 'Skills' },
      { href: '#career', label: 'Karriere' },
      { href: '#travel', label: 'Reisen' },
      { href: '#sport', label: 'Sport' },
      { href: '#projects', label: 'Projekte' },
      { href: '#contact', label: 'Kontakt' },
    ],
  },
  career: {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#career', label: 'Karriere' },
      { href: '/#travel', label: 'Reisen' },
      { href: '/#contact', label: 'Kontakt' },
    ],
  },
  'travel-hawaii': {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#travel', label: 'Reisen' },
      { href: '/#about', label: 'Über mich' },
      { href: '/#contact', label: 'Kontakt' },
    ],
  },
  'travel-cannes': {
    navLabel: 'Main navigation',
    logoHref: '/#top',
    links: [
      { href: '/#travel', label: 'Travel' },
      { href: '/#about', label: 'About' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
  love: {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [{ href: '/#love-story', label: '← Unsere Geschichte' }],
  },
};

export function SiteHeader({ variant }: { variant: Variant }) {
  const { navLabel, logoHref, links } = VARIANTS[variant];

  return (
    <header className="site-header" role="banner">
      <nav className="site-nav" aria-label={navLabel}>
        <a href={logoHref} className="logo">
          Steven
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={`${link.href}|${link.label}`}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
