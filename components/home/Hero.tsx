import { HeroBadge } from '@/components/HeroBadge';
import { AvatarMode } from '@/components/home/AvatarMode';
import { techOutfit, type AvatarOutfit } from '@/lib/avatar';

export function Hero({ outfit = techOutfit }: { outfit?: AvatarOutfit }) {
  return (
    <section id="top" className="home-hero" data-enter="" aria-labelledby="home-hero-title">
      <div className="wrap home-hero-shell">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">Steven Braun</p>
          <h1 id="home-hero-title" className="home-hero-title">
            Erst Maschinen gebaut. <em>Jetzt Software.</em>
          </h1>

          <p className="home-hero-lead">
            Als Industriemechaniker habe ich Hydraulikpressen gebaut. Seit 2025
            studiere ich Informatik an der DHBW Mosbach und entwickle Lerntrainer für meine Klausuren.
          </p>

          <div className="home-hero-actions">
            <a href="#werdegang" className="home-btn home-btn--primary">
              Werdegang lesen <span aria-hidden="true">↓</span>
            </a>
            <a href="#projekte" className="home-link">
              Zum Lerntrainer
            </a>
          </div>
        </div>

        <AvatarMode outfit={outfit} />
      </div>

      <HeroBadge />
    </section>
  );
}
