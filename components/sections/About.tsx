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
                  Eine Knieverletzung hat meinen Plan zerstört. Und mir den
                  richtigen gezeigt.
                </p>
                <p>
                  Als Industriemechaniker war Arbeit körperlich. Dann zwang
                  mich mein Knie umzudenken. Zum ersten Mal in meinem Leben
                  habe ich wirklich gelernt — und gemerkt, dass es mir Spaß
                  macht. Techniker-Abschluss: 1,2. Heute studiere ich
                  Angewandte Informatik, entwickle KI-Systeme und baue
                  Lernmethoden, die wirklich funktionieren.
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
        <div className="card werte-vision-card">
          <h3>Werte &amp; Vision</h3>
          <blockquote className="anime-quote">
            <p>
              &ldquo;I&rsquo;m not gonna run away, I never go back on my word!
              That&rsquo;s my nindo: my ninja way!&rdquo;
            </p>
            <cite>— Naruto Uzumaki</cite>
          </blockquote>
          <blockquote className="anime-quote">
            <p>&ldquo;If you don&rsquo;t take risks, you can&rsquo;t create a future!&rdquo;</p>
            <cite>— Monkey D. Luffy</cite>
          </blockquote>
          <p className="werte-transfer">
            Mein Weg war kein gerader. Aber er war immer meiner. Technik.
            Software. KI. Freiheit. Das ist, was mich antreibt — und wohin
            ich gehe.
          </p>
          <a href="/motivation" className="text-link werte-more">
            Meine volle Story →
          </a>
        </div>
      </div>
    </section>
  );
}
