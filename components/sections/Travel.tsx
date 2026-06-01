import { SectionHead } from '@/components/SectionHead';
import { Coverflow, type CoverflowSlide } from '@/components/sections/Coverflow';

// ——— Coverflow-Folien ———————————————————————————————————————
// Neue Folie hinzufügen = eine Zeile. { src, alt, caption } – fertig.
const HAWAII_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709605/MaunakeaSunset_ouuchw.jpg',
    alt: 'Sonnenuntergang über den Wolken auf dem Mauna Kea',
    caption: 'Über den Wolken auf 4.200 Metern – Sonnenuntergang am Mauna Kea.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774296986/North-Shore-Surfen-auf-Oahu-1024x585_btzenz.jpg',
    alt: 'Surfer an der North Shore von Oahu',
    caption: 'North Shore – wo die größten Wellen der Welt brechen.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237682/pages/travel/hawaii/videos/alltag_waikiki_beach.jpg',
    alt: 'Waikiki Beach in Honolulu',
    caption: 'Waikiki Beach – Alltag wird hier zum Postkartenmotiv.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237655/pages/travel/hawaii/videos/adv_manoa_1.jpg',
    alt: 'Manoa-Regenwald auf dem Weg zum Wasserfall',
    caption: 'Manoa Valley – grüner Dschungel mitten auf Oahu.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237657/pages/travel/hawaii/videos/adv_pali_1.jpg',
    alt: 'Aussicht vom Pali Lookout',
    caption: 'Pali Lookout – der Wind, der dich fast umwirft.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240022/pages/travel/hawaii/videos/PokeBowl.jpg',
    alt: 'Frische Poke Bowl auf Oahu',
    caption: 'Poke Bowl – das Gericht der Insel, an jeder Ecke.',
  },
];

const CANNES_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237639/pages/travel/cannes/images/1_Tour_Start.jpg',
    alt: 'Start der Fahrradtour in Konstanz',
    caption: 'Kilometer null – Start in Konstanz, Ziel: das Mittelmeer.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239656/pages/travel/cannes/images/june24-alpine-pass.png',
    alt: 'Alpenpass auf der Fahrradtour',
    caption: 'Der erste Alpenpass – jede Kurve hart erkämpft.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239658/pages/travel/cannes/images/june25-lake-camping.png',
    alt: 'Camping an einem Bergsee',
    caption: 'Nachtlager am Bergsee – das beste Hotel der Welt.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239644/pages/travel/cannes/images/june26-tent-morning.jpg',
    alt: 'Morgen am Zelt während der Tour',
    caption: 'Morgens aus dem Zelt – und direkt weiter Richtung Süden.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239660/pages/travel/cannes/images/june30-alpine-lake.jpg',
    alt: 'Alpensee auf der zweiten Alpenüberquerung',
    caption: 'Zweite Alpenüberquerung – Wasser klar wie Glas.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239653/pages/travel/cannes/images/july01-arrival-bike.jpg',
    alt: 'Ankunft mit dem Fahrrad in Südfrankreich',
    caption: 'Ankunft in Südfrankreich – Salzluft, Wiedersehen, geschafft.',
  },
];

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
          <Coverflow slides={HAWAII_SLIDES} label="Hawaii" />
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
          <Coverflow slides={CANNES_SLIDES} label="Cannes" />
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
