import { SectionHead } from '@/components/SectionHead';

const HAWAII_STATIONS = [
  { slug: 'flug-ankunft', label: 'Flug & Ankunft' },
  { slug: 'alltag', label: 'Alltag' },
  { slug: 'adventures', label: 'Adventures' },
  { slug: 'big-island', label: 'Big Island' },
  { slug: 'essen-kultur', label: 'Essen & Kultur' },
  { slug: 'abschluss', label: 'Abschluss' },
];

const CANNES_STATIONS = [
  { slug: 'motivation', label: 'Motivation' },
  { slug: 'startpunkt-konstanz', label: 'Startpunkt Konstanz' },
  { slug: 'tag-1', label: 'Tag 1' },
  { slug: 'tag-2', label: 'Tag 2' },
  { slug: 'tag-3', label: 'Tag 3' },
  { slug: 'tag-4', label: 'Tag 4' },
  { slug: 'abschnitt-italien', label: 'Abschnitt Italien' },
  { slug: 'zweite-alpenueberquerung', label: 'Zweite Alpenüberquerung' },
  { slug: 'ankunft-suedfrankreich', label: 'Ankunft Südfrankreich' },
];

export function Travel() {
  return (
    <section id="travel" className="travel" aria-labelledby="travel-title">
      <SectionHead
        kicker="Reisen"
        titleId="travel-title"
        title="Meine Reisegeschichten"
        intro="Hawaii als Sprachreise und eine Fahrradtour von Konstanz nach Cannes."
      />
      <div className="travel-grid">
        <article className="travel-box">
          <header className="travel-box-header">
            <h3>Hawaii Sprachreise</h3>
            <span className="travel-date">02.03.2025 – 14.04.2025</span>
          </header>
          <ul className="travel-stats">
            <li>
              <strong>Dauer:</strong> ca. 6 Wochen
            </li>
            <li>
              <strong>Fokus:</strong> Sprache, Kultur, Alltag
            </li>
            <li>
              <strong>Höhepunkte:</strong> Vulkan, Big Island, Skydiving
            </li>
            <li>
              <strong>Abschluss:</strong> C1-Zertifikat
            </li>
          </ul>
          <nav className="travel-stations">
            {HAWAII_STATIONS.map((s) => (
              <a
                key={s.slug}
                href={`/reisen/hawaii/${s.slug}`}
                className="travel-station"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </article>

        <article className="travel-box">
          <header className="travel-box-header">
            <h3>Fahrradtour Konstanz → Cannes</h3>
            <span className="travel-date">21.06.2025 – 01.07.2026</span>
          </header>
          <ul className="travel-stats">
            <li>
              <strong>Antrieb:</strong> Spontan, selbstfinanziert
            </li>
            <li>
              <strong>Route:</strong> Konstanz → Cannes
            </li>
            <li>
              <strong>Herausforderung:</strong> Alpen, Wetter, Umwege
            </li>
            <li>
              <strong>Ende:</strong> Südfrankreich &amp; Wiedersehen
            </li>
          </ul>
          <nav className="travel-stations">
            {CANNES_STATIONS.map((s) => (
              <a
                key={s.slug}
                href={`/reisen/cannes/${s.slug}`}
                className="travel-station"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </article>
      </div>
    </section>
  );
}
