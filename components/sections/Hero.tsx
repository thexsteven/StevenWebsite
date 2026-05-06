import { HeroBadge } from '@/components/HeroBadge';

export function Hero() {
  return (
    <section id="top" className="hero hero--image" aria-label="Hero-Bereich">
      <p className="hero-tagline">
        Dualer Informatikstudent, sportbegeistert und auf Reisen zuhause.
      </p>
      <div className="hero-content">
        <p className="eyebrow">Pressure shapes diamonds · Stay hard</p>
        <h1>Homepage Steven Braun</h1>
        <div className="hero-actions">
          <a href="#travel" className="btn">
            Meine Reisen
          </a>
          <a href="#about" className="btn btn-ghost">
            Mehr über mich
          </a>
        </div>
      </div>
      <HeroBadge />
    </section>
  );
}
