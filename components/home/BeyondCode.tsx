import Link from 'next/link';

type Teaser = {
  href: string;
  title: string;
  meta: string;
  desc: string;
};

const TEASERS: Teaser[] = [
  {
    href: '/reisen',
    title: 'Reisen',
    meta: 'Hawaii · Konstanz → Cannes',
    desc: 'Sechs Wochen Sprachreise auf Oahu und eine Fahrradtour über die Alpen ans Mittelmeer.',
  },
  {
    href: '/sport',
    title: 'Sport',
    meta: 'Ausdauer · Kraft · Mindset',
    desc: 'Warum Disziplin im Training und Disziplin beim Bauen dieselbe Fähigkeit sind.',
  },
  {
    href: '/bibliothek',
    title: 'Bibliothek',
    meta: 'Bücher & Zitate',
    desc: 'Was meinen Blick auf Lernen und Disziplin geprägt hat – mit Platz für Diskussion.',
  },
  {
    href: '/motivation',
    title: 'Motivation',
    meta: 'Ehrlich, kein LinkedIn-Post',
    desc: 'Was mich wirklich antreibt, erzählt anhand der Figuren, die es besser sagen als ich.',
  },
];

export function BeyondCode() {
  return (
    <section
      id="beyond"
      className="home-section home-beyond"
      aria-labelledby="home-beyond-title"
    >
      {/* Rücksprung `/#travel` aus den Reise-Unterseiten. */}
      <span id="travel" className="home-anchor-alias" aria-hidden="true" />

      <div className="home-shell">
        <header className="home-head">
          <p className="home-kicker">Beyond Code</p>
          <h2 id="home-beyond-title" className="home-title">
            Was sonst noch zählt.
          </h2>
        </header>

        <ul className="home-beyond-grid">
          {TEASERS.map((teaser) => (
            <li key={teaser.href}>
              <Link href={teaser.href} className="home-teaser">
                <span className="home-teaser-meta">{teaser.meta}</span>
                <span className="home-teaser-title">{teaser.title}</span>
                <span className="home-teaser-desc">{teaser.desc}</span>
                <span className="home-teaser-cue" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
