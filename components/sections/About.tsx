import { SectionHead } from '@/components/SectionHead';

const stations = [
  {
    id: 'schule',
    title: 'Realschule',
    period: 'Aug. 2011 – Juli 2017',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778156328/IMG_0383_x5xcp9.jpg',
    imageAlt: 'Schulzeit',
  },
  {
    id: 'ausbildung',
    title: 'Ausbildung',
    subtitle: 'Industriemechaniker',
    period: 'Aug. 2017 – Juli 2021',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778156329/IMG_0384_kngetr.jpg',
    imageAlt: 'Ausbildung Industriemechaniker',
  },
  {
    id: 'beruf',
    title: 'Berufstätigkeit',
    subtitle: 'Industriemechaniker',
    period: 'März 2021 – Dez. 2022',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778156329/IMG_0385_y9ov7s.jpg',
    imageAlt: 'Job als Industriemechaniker',
  },
  {
    id: 'techniker',
    title: 'Techniker',
    subtitle: 'Maschinenbau',
    period: 'März 2023 – Feb. 2025',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778156329/IMG_0387_yma1fc.jpg',
    imageAlt: 'Maschinenbau-Techniker',
  },
  {
    id: 'studium',
    title: 'Duales Studium',
    subtitle: 'Angewandte Informatik',
    period: 'Sept. 2025 – heute',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778156513/IMG_8821_l2mkjj.jpg',
    imageAlt: 'Duales Studium DHBW Mosbach',
  },
];

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <SectionHead
        kicker="Über mich"
        titleId="about-title"
        title="Kurz, klar, persönlich."
        intro="Mein Fokus liegt auf angewandter Informatik, Gesundheit und kontinuierlichem Lernen – im Studium, im Sport und auf Reisen."
      />

      <div className="werdegang-strip">
        {stations.map((s) => (
          <div key={s.id} className={`station-card station-card--${s.id}`}>
            {s.imageSrc ? (
              <img src={s.imageSrc} alt={s.imageAlt} />
            ) : (
              <div className="station-placeholder" aria-hidden="true" />
            )}
            <div className="station-overlay">
              <span className="station-period">{s.period}</span>
              <strong className="station-title">{s.title}</strong>
              {'subtitle' in s && s.subtitle && (
                <span className="station-subtitle">{s.subtitle}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="werdegang-text">
        <p>
          Ich habe nie wirklich für die Schule gelernt. Weder in der Realschule
          noch in der Berufsschule. Arbeit war körperlich — und das war okay,
          bis eine Knieverletzung meinen Plan zerstörte.
        </p>
        <p>
          Plötzlich musste ich mit dem Kopf verdienen, nicht mit den Händen.
          Beim Maschinenbau-Techniker habe ich mich zum ersten Mal in meinem
          Leben wirklich angestrengt — und gemerkt, dass Lernen Spaß machen
          kann. Abschluss: <strong>1,2</strong>.
        </p>
        <p>
          Danach war klar: Ich wollte in ein Feld, das maximales Lernen
          fordert und mich gleichzeitig fasziniert. Angewandte Informatik,
          KI, Lernsysteme. Das ist es.
        </p>
      </div>

      <div className="werte-vision-wrap">
        <a href="/motivation" className="flip-card-link">
          <div className="flip-card" tabIndex={0}>
            <div className="flip-card-inner">
              <div className="flip-card-front card werte-vision-card">
                <h3>Werte &amp; Vision</h3>
                <blockquote className="anime-quote">
                  <p>
                    &ldquo;I&rsquo;m not gonna run away, I never go back on my
                    word! That&rsquo;s my nindo: my ninja way!&rdquo;
                  </p>
                  <cite>— Naruto Uzumaki</cite>
                </blockquote>
                <blockquote className="anime-quote">
                  <p>
                    &ldquo;If you don&rsquo;t take risks, you can&rsquo;t
                    create a future!&rdquo;
                  </p>
                  <cite>— Monkey D. Luffy</cite>
                </blockquote>
              </div>
              <div className="flip-card-back">
                <h3>Was das bedeutet</h3>
                <p className="flip-back-text">
                  &ldquo;I never go back on my word.&rdquo;
                  <br />
                  <span className="flip-back-cite">— Naruto Uzumaki</span>
                  <br />
                  <br />
                  &ldquo;If you don&rsquo;t take risks,
                  you can&rsquo;t create a future.&rdquo;
                  <br />
                  <span className="flip-back-cite">— Monkey D. Luffy</span>
                </p>
                <span className="flip-cta">Zitate die mich inspirieren</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
