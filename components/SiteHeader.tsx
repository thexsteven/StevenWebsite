type NavItem = { href: string; label: string };
type Variant =
  | 'home'
  | 'sub'
  | 'career'
  | 'travel-hawaii'
  | 'travel-cannes'
  | 'motivation';

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
      { href: '#projekte', label: 'Projekte' },
      { href: '#werdegang', label: 'Werdegang' },
      { href: '#beyond', label: 'Beyond Code' },
    ],
  },
  // Hub-Seiten der zweiten Ebene (/projekte, /reisen, /sport, /bibliothek).
  sub: {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#projekte', label: 'Projekte' },
      { href: '/#werdegang', label: 'Werdegang' },
      { href: '/#beyond', label: 'Beyond Code' },
    ],
  },
  career: {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#career', label: 'Karriere' },
      { href: '/#travel', label: 'Reisen' },
      { href: '/#projekte', label: 'Projekte' },
    ],
  },
  'travel-hawaii': {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#travel', label: 'Reisen' },
      { href: '/#about', label: 'Über mich' },
      { href: '/#projekte', label: 'Projekte' },
    ],
  },
  'travel-cannes': {
    navLabel: 'Main navigation',
    logoHref: '/#top',
    links: [
      { href: '/#travel', label: 'Travel' },
      { href: '/#about', label: 'About' },
      { href: '/#projekte', label: 'Projects' },
    ],
  },
  motivation: {
    navLabel: 'Hauptnavigation',
    logoHref: '/#top',
    links: [
      { href: '/#about', label: 'Über mich' },
      { href: '/#resume', label: 'Lebenslauf' },
      { href: '/#projekte', label: 'Projekte' },
    ],
  },
};

export function SiteHeader({ variant }: { variant: Variant }) {
  const { navLabel, logoHref, links } = VARIANTS[variant];

  return (
    <header className={variant === 'home' ? 'site-header site-header--home nav' : 'site-header'} role="banner">
      <nav className={variant === 'home' ? 'site-nav wrap' : 'site-nav'} aria-label={navLabel}>
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
