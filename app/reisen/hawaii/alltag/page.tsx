import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiAlltagMap } from '@/components/HawaiiAlltagMap';

export const metadata: Metadata = {
  title: 'Hawaii · Alltag | Steven',
  description:
    'Hawaii Sprachreise – Alltag: Schulweg mit dem Fahrrad, EF Language School, Surfkurs am Ala Moana Beach und Nachmittage in Waikiki.',
};

export default function HawaiiAlltag() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Alltag"
        meta="März – April 2025 · Waikiki, Honolulu"
        summary="Sechs Wochen mit festem Tagesrhythmus: morgens Schule, nachmittags Sport, abends Strand. So sieht Hawaii aus, wenn man länger bleibt als zwei Wochen."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            {
              label: 'Unterkunft',
              value: 'Waikiki Malia Hotel · 2211 Kuhio Ave',
            },
            {
              label: 'Sprachschule',
              value:
                'EF Education First · Kapiolani Blvd, neben Ala Moana Center',
            },
            { label: 'Schulweg', value: '~2,5 km mit dem Fahrrad, täglich' },
            {
              label: 'Kurse',
              value: 'Vokabelkurs + Surfkurs am Ala Moana Beach',
            },
            { label: 'Aufenthalt', value: '6 Wochen · März – April 2025' },
          ]}
        />

        <div className="album-grid">
          <div className="album-section">
            <h2>Schulweg · Ala Wai Canal</h2>
            <p>
              Jeden Morgen das gleiche: Fahrrad raus, entlang des Ala Wai Kanals
              Richtung Schule. ~2 km, früh morgens, erstaunlich ruhig.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237665/pages/travel/hawaii/videos/alltag_schulweg.jpg"
              alt="Schulweg mit dem Fahrrad durch Waikiki"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237668/pages/travel/hawaii/videos/alltag_angler.jpg"
              alt="Angler am Ala Wai Canal"
              loading="lazy"
            />
            <figcaption>
              Die Angler am Kanalrand. Jeden Morgen da, ganz ruhig. Ob da jemals
              einer was fängt, weiß ich bis heute nicht.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237669/pages/travel/hawaii/videos/alltag_kanal.jpg"
              alt="Reiher am Ala Wai Canal"
              loading="lazy"
            />
          </figure>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237671/pages/travel/hawaii/videos/alltag_stadt.jpg"
              alt="Honolulus Skyline auf dem Schulweg"
              loading="lazy"
            />
            <figcaption>
              Honolulus Skyline auf dem Weg zur Schule. Schöner Pendlerweg.
            </figcaption>
          </figure>

          <HawaiiAlltagMap className="album-item album-item--wide album-map" />

          <div className="album-section">
            <h2>EF Language School · Surfkurs</h2>
            <p>
              Schule direkt neben dem Ala Moana Center. Vokabelunterricht
              morgens, Surfkurs regelmäßig direkt danach – Brett greifen,
              Strand, Wasser.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237672/pages/travel/hawaii/videos/alltag_alamoana.jpg"
              alt="Ala Moana Beach Park nahe der EF School"
              loading="lazy"
            />
            <figcaption>
              Ala Moana Beach Park, direkt neben der Schule. Die drei Surflehrer
              Reid, Nui und Silva – entspannt, geduldig, immer gut drauf.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Calisthenics Park</h2>
            <p>
              Outdoor-Fitnessanlage direkt am Ala Moana Beach Park. Stangen,
              Barren, Ringe, freier Blick aufs Meer. Der Park hat mich jeden Tag
              wieder hingelockt.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237678/pages/travel/hawaii/videos/alltag_cali.jpg"
              alt="Calisthenics Park am Ala Moana Beach Park"
              loading="lazy"
            />
            <figcaption>
              Die Leute, die dort trainieren, sind wirklich gut. Man schaut zu
              und schaut was ab.
            </figcaption>
          </figure>

          <figure className="album-item">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237676/pages/travel/hawaii/videos/alltag_workout.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
          </figure>

          <div className="album-section">
            <h2>Nachmittage in Waikiki</h2>
            <p>
              Nach der Schule: essen gehen, Strand, manchmal nichts. Der Waikiki
              Beach ist touristisch – nachmittags, wenn die Massen weg sind, ist
              er aber ganz gut.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237679/pages/travel/hawaii/videos/alltag_beach.jpg"
              alt="Duke Kahanamoku Statue am Waikiki Beach"
              loading="lazy"
            />
            <figcaption>
              Duke Kahanamoku – der Vater des modernen Surfens. Passender Ort
              für eine Statue.
            </figcaption>
          </figure>

          <figure className="album-item">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237680/pages/travel/hawaii/videos/alltag_jump.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237682/pages/travel/hawaii/videos/alltag_waikiki_beach.jpg"
              alt="Feuerwerk am Waikiki Beach freitagabends"
              loading="lazy"
            />
            <figcaption>
              Freitags gibt es am Waikiki Beach Feuerwerk. Klingt touristisch –
              ist es auch. Trotzdem jedes Mal schön.
            </figcaption>
          </figure>

          <figure className="album-item">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237685/pages/travel/hawaii/videos/alltag_deeptalk.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Abende am Strand mit Leuten, die man zwei Wochen vorher noch nicht
              kannte.
            </figcaption>
          </figure>
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          {
            href: '/reisen/hawaii/flug-ankunft',
            label: 'Vorheriges Kapitel: Flug & Ankunft',
            ghost: true,
          },
          {
            href: '/reisen/hawaii/adventures',
            label: 'Nächstes Kapitel: Adventures',
          },
        ]}
      />
    </section>
  );
}
