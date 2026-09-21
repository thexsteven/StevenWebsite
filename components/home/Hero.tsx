import { HeroBadge } from '@/components/HeroBadge';
import { AvatarMode } from '@/components/home/AvatarMode';
import { techOutfit, type AvatarOutfit } from '@/lib/avatar';

export function Hero({ outfit = techOutfit }: { outfit?: AvatarOutfit }) {
  return (
    <section id="top" className="home-hero home-hero--avatar" aria-labelledby="home-hero-title">
      <div className="home-shell home-hero-shell">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">
            Angewandte Informatik · DHBW Mosbach · Praxis bei Emerson
          </p>
          <h1
            id="home-hero-title"
            className="home-hero-title"

          >
            Ich baue Werkzeuge, die Lernen schneller machen
            <span className="home-hero-dot" aria-hidden="true">
              .
            </span>
          </h1>

          <p className="home-hero-lead">
            Zuletzt: ein Klausurtrainer mit über 30 interaktiven Übungen und
            eine Prüfschicht für physikalische Plausibilität in einer
            Messdaten-Pipeline. React, Python, Next.js.
          </p>

          <div className="home-hero-actions">
            <a href="#projekte" className="home-btn home-btn--primary">
              Projekte ansehen
            </a>
            <a href="#werdegang" className="home-btn home-btn--ghost">
              Werdegang
            </a>
          </div>
        </div>

        <AvatarMode outfit={outfit} />
      </div>

      <HeroBadge />
    </section>
  );
}
