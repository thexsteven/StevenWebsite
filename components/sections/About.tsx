import { SectionHead } from '@/components/SectionHead';

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <SectionHead
        kicker="Über mich"
        titleId="about-title"
        title="Kurz, klar, persönlich."
        intro="Mein Fokus liegt auf angewandter Informatik, Gesundheit und kontinuierlichem Lernen – im Studium, im Sport und auf Reisen."
      />
      <div className="section-body grid-2">
        <a href="/motivation" className="flip-card-link">
          <div className="flip-card" tabIndex={0}>
            <div className="flip-card-inner">
              <div className="flip-card-front card">
                <h3>Profil</h3>
                <p>
                  Technikaffiner Informatikstudent mit
                  Maschinenbau-Techniker-Background, starkem Fokus auf KI,
                  strukturiertes Lernen über Notion-Systeme und
                  praxisorientierte Projekte zur kontinuierlichen
                  Weiterentwicklung
                </p>
                <span className="flip-hint">Klick für Motivation →</span>
              </div>
              <div className="flip-card-back">
                <h3>Meine Motivation</h3>
                <p className="flip-back-text">
                  Maximale Kompetenzentwicklung:
                  <br />
                  Systeme verstehen – Technik, Software, KI.
                </p>
                <span className="flip-cta">Mehr erfahren</span>
              </div>
            </div>
          </div>
        </a>
        <div className="card">
          <h3>Schwerpunkte</h3>
          <ul className="list">
            <li>Web Engineering &amp; saubere Frontend-Strukturen</li>
            <li>Sportliche Routinen &amp; mentale Stärke</li>
            <li>Reisen als Lern- und Inspirationsquelle</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
