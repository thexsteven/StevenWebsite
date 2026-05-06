import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Hawaii · Adventures | Steven',
  description:
    'Hawaii Sprachreise – Adventures: Koko Head zum Sonnenaufgang, Manoa Falls, Nuuanu Pali, Skydive mit GoJump Hawaii und eine Roller-Tour rund um Oahu.',
};

export default function HawaiiAdventures() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Adventures"
        meta="März – April 2025 · Oahu"
        summary="Koko Head zweimal nachts, Fallschirmsprung aus 4.200 m, Roller quer durch Oahu – das war die Seite von Hawaii, die man sich selbst holen muss."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            {
              label: 'Trails',
              value: 'Koko Head (2×), Manoa Falls, Nuuanu Pali',
            },
            { label: 'Skydive', value: 'GoJump Hawaii · Tandem aus ~4.200 m' },
            {
              label: 'Roller-Tour',
              value: 'Waikiki → Haleiwa → Sunset Beach',
            },
            {
              label: 'Schwierigste Tour',
              value: 'Koko Head Crater Trail ★★★★',
            },
            {
              label: 'Persönliches Highlight',
              value: 'Skydive mit GoJump Hawaii',
            },
          ]}
        />

        <div className="album-grid">
          <div className="album-section">
            <h2>Koko Head Crater Trail</h2>
            <p>
              1.048 alte Bahnschwellen, schnurgerade nach oben. Ich hab das
              zweimal gemacht – beide Male mitten in der Nacht, um rechtzeitig
              oben zu sein.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237650/pages/travel/hawaii/videos/adv_kokohead_1.jpg"
              alt="Blick vom Koko Head Crater Trail bei Sonnenaufgang"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237652/pages/travel/hawaii/videos/adv_kokohead_2.jpg"
              alt="Auf den Eisenbahnschwellen des Koko Head Trails"
              loading="lazy"
            />
            <figcaption>
              Irgendwo in der Mitte: die Midway Bridge. Eine Lücke in den
              Schwellen, darunter direkt der Abgrund.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237653/pages/travel/hawaii/videos/adv_kokohead_3.jpg"
              alt="Ausblick vom Gipfel des Koko Head über Honolulu"
              loading="lazy"
            />
            <figcaption>
              Oben: Honolulu links, Diamond Head in der Mitte, Kailua rechts.
              Die Stadt schläft noch.
            </figcaption>
          </figure>

          <div className="album-text">
            <p>
              Der Aufstieg ist ehrlich gesagt ziemlich hart – ungleichmäßige
              Schwellen, sandiger Untergrund, die Beine protestieren nach der
              Hälfte. Aber wenn man oben ankommt und die Sonne gerade über den
              Pazifik kriecht, macht das vieles wett. Beim zweiten Mal war ich
              schneller. Nicht weil ich fitter war, sondern weil ich wusste, was
              mich erwartet.
            </p>
          </div>

          <div className="album-section">
            <h2>Manoa Falls</h2>
            <p>
              1,6 km durch dichten Regenwald. Das komplette Gegenteil vom
              Strand-Hawaii.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237655/pages/travel/hawaii/videos/adv_manoa_1.jpg"
              alt="Regenwald am Manoa Falls Trail"
              loading="lazy"
            />
            <figcaption>
              Bambus so hoch wie Hauswände. Nach Regen ist der Weg ziemlich
              matschig.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237655/pages/travel/hawaii/videos/adv_manoa_1.jpg"
              alt="Vegetation am Manoa Falls Trail"
              loading="lazy"
            />
            <figcaption>
              46 Meter Wasserfall am Ende. Baden verboten – Leptospirose im
              Wasser. Einfach davorstehen reicht.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Nuuanu Pali Lookout</h2>
            <p>
              Keine Wanderung – einfach hinfahren, aussteigen, staunen. Und sich
              vom Wind fast umwerfen lassen.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237657/pages/travel/hawaii/videos/adv_pali_1.jpg"
              alt="Blick vom Nuuanu Pali Lookout über die Windward Side"
              loading="lazy"
            />
            <figcaption>
              360 m Höhe, Ko'olau-Bergkante. Der Blick auf Kaneohe Bay und
              Kailua ist einer der besten auf der ganzen Insel.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237658/pages/travel/hawaii/videos/adv_pali_2.jpg"
              alt="Steilwand am Nuuanu Pali"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237660/pages/travel/hawaii/videos/adv_pali_3.jpg"
              alt="Nuuanu Pali – Ko'olau Gebirge"
              loading="lazy"
            />
            <figcaption>
              1795 hat Kamehameha I. hier seine Gegner über die Klippen
              getrieben. Der Ort hat eine harte Geschichte.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Skydive · GoJump Hawaii</h2>
            <p>
              GoJump Hawaii, Dillingham Airfield, Nordküste. 4.200 m Tandem. Man
              springt nicht – man fällt rückwärts raus.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774293778/IMG_3175_abs794.jpg"
              alt="Vor dem Sprung – mit Harness im Drop Zone Gebäude von GoJump Hawaii"
              loading="lazy"
            />
            <figcaption>
              Vor dem Sprung. Beruhigend wirkt das Briefing nicht wirklich.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774295478/IMG_9535_elvh72.jpg"
              alt="Im Flugzeug kurz vor dem Absprung"
              loading="lazy"
            />
            <figcaption>
              Im Flugzeug, Tür auf, Oahu in Miniaturformat. Die Sekunde davor
              ist schwer zu beschreiben.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774295478/IMG_9537_r6kk5x.jpg"
              alt="Freefall – Tandem-Skydive über Oahu"
              loading="lazy"
            />
            <figcaption>
              ~60 Sekunden Freifall. Kein Tunnelblick, kein Schwindel – nur Wind
              und eine seltsame Stille im Kopf.
            </figcaption>
          </figure>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774295477/IMG_9534_lnt1vz.jpg"
              alt="Fallschirm geöffnet – Blick auf die Küste von Oahu"
              loading="lazy"
            />
            <figcaption>
              Fallschirm auf, alles wird ruhig. Hier versteht man zum ersten
              Mal, wie klein die Insel wirklich ist.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>North Shore · 125er Roller</h2>
            <p>
              125-ccm-Roller, Waikiki Richtung Norden, kein fester Plan.
              Haleiwa, Sunset Beach, Garlic Shrimp vom Truck. Hat sich gelohnt.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774293777/IMG_3114_mhldjw.jpg"
              alt="Highway Richtung North Shore"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237661/pages/travel/hawaii/videos/adv_northshore_1.jpg"
              alt="Küstenstraße auf dem Weg zur North Shore"
              loading="lazy"
            />
            <figcaption>
              Berge links, Meer rechts, warme Luft. Die Fahrt selbst war schon
              ein Teil des Erlebnisses.
            </figcaption>
          </figure>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774296986/North-Shore-Surfen-auf-Oahu-1024x585_btzenz.jpg"
              alt="Sunset Beach – Wellen am North Shore"
              loading="lazy"
            />
            <figcaption>
              Sunset Beach. Im Winter rollen hier Wellen mit 5–6+ Metern rein.
              An dem Tag wurde gerade ein Contest vorbereitet.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237664/pages/travel/hawaii/videos/adv_northshore_3.jpg"
              alt="North Shore – Blick entlang der Küste"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774297207/IMG_3130_kwubha.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Garlic Shrimp mit Reis, direkt vom Truck bei Kahuku. Eine der
              besten Mittagspausen, die ich je hatte.
            </figcaption>
          </figure>
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          {
            href: '/reisen/hawaii/alltag',
            label: 'Vorheriges Kapitel: Alltag',
            ghost: true,
          },
          {
            href: '/reisen/hawaii/big-island',
            label: 'Nächstes Kapitel: Big Island',
          },
        ]}
      />
    </section>
  );
}
