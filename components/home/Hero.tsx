import Image from 'next/image';

import { HeroBadge } from '@/components/HeroBadge';
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

        <figure className="home-avatar">
          <Image
            src={outfit.image}
            alt={outfit.alt}
            width={1024}
            height={1536}
            priority
            unoptimized
          />
          <figcaption>Steven, neu gezeichnet.</figcaption>
        </figure>
      </div>

      <HeroBadge />
    </section>
  );
}
