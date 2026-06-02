import type { Metadata } from 'next';
import { HawaiiStoryHero } from '@/components/HawaiiStoryHero';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiSectionHeader } from '@/components/HawaiiSectionHeader';
import { HawaiiCarousel } from '@/components/sections/HawaiiCarousel';
import { HawaiiAlltagMap } from '@/components/HawaiiAlltagMap';

export const metadata: Metadata = {
  title: 'Hawaii · Alltag | Steven',
  description:
    'Hawaii Sprachreise – Alltag: Schulweg mit dem Fahrrad, EF Language School, Surfkurs am Ala Moana Beach und Nachmittage in Waikiki.',
};

export default function HawaiiAlltag() {
  return (
    <>
      <HawaiiStoryHero
        slug="alltag"
        eyebrow="Hawaii Sprachreise"
        titleId="story-title"
        title="Alltag"
        meta="März – April 2025 · Waikiki, Honolulu"
        place="dem Ala Wai Canal in Waikiki mit dem Koʻolau-Gebirge, Honolulu"
        summary="Sechs Wochen mit festem Tagesrhythmus: morgens Schule, nachmittags Sport, abends Strand. So sieht Hawaii aus, wenn man länger bleibt als zwei Wochen."
      />

      <section className="story-detail" aria-labelledby="story-title">
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

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Schulweg · Ala Wai Canal" />
            <div className="hawaii-section-text">
              <p>
                Jeden Morgen das gleiche: Fahrrad raus, entlang des Ala Wai Kanals
                Richtung Schule. ~2 km, früh morgens, erstaunlich ruhig.
              </p>
            </div>
            <HawaiiCarousel
              label="Schulweg am Ala Wai Canal"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237665/pages/travel/hawaii/videos/alltag_schulweg.jpg',
                  alt: 'Schulweg mit dem Fahrrad durch Waikiki',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237668/pages/travel/hawaii/videos/alltag_angler.jpg',
                  alt: 'Angler am Ala Wai Canal',
                  caption:
                    'Die Angler am Kanalrand. Jeden Morgen da, ganz ruhig. Ob da jemals einer was fängt, weiß ich bis heute nicht.',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237669/pages/travel/hawaii/videos/alltag_kanal.jpg',
                  alt: 'Reiher am Ala Wai Canal',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237671/pages/travel/hawaii/videos/alltag_stadt.jpg',
                  alt: 'Honolulus Skyline auf dem Schulweg',
                  caption:
                    'Honolulus Skyline auf dem Weg zur Schule. Schöner Pendlerweg.',
                },
              ]}
            />
            <HawaiiAlltagMap className="hawaii-section-map" />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="EF Language School · Surfkurs" />
            <div className="hawaii-section-text">
              <p>
                Schule direkt neben dem Ala Moana Center. Vokabelunterricht
                morgens, Surfkurs regelmäßig direkt danach – Brett greifen,
                Strand, Wasser.
              </p>
            </div>
            <HawaiiCarousel
              label="EF Language School und Surfkurs"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237672/pages/travel/hawaii/videos/alltag_alamoana.jpg',
                  alt: 'Ala Moana Beach Park nahe der EF School',
                  caption:
                    'Ala Moana Beach Park, direkt neben der Schule. Die drei Surflehrer Reid, Nui und Silva – entspannt, geduldig, immer gut drauf.',
                },
              ]}
            />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Calisthenics Park" />
            <div className="hawaii-section-text">
              <p>
                Outdoor-Fitnessanlage direkt am Ala Moana Beach Park. Stangen,
                Barren, Ringe, freier Blick aufs Meer. Der Park hat mich jeden Tag
                wieder hingelockt.
              </p>
            </div>
            <HawaiiCarousel
              label="Calisthenics Park"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237678/pages/travel/hawaii/videos/alltag_cali.jpg',
                  alt: 'Calisthenics Park am Ala Moana Beach Park',
                  caption:
                    'Die Leute, die dort trainieren, sind wirklich gut. Man schaut zu und schaut was ab.',
                },
                {
                  type: 'video',
                  src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237676/pages/travel/hawaii/videos/alltag_workout.mp4',
                  label: 'Workout im Calisthenics Park',
                },
              ]}
            />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Nachmittage in Waikiki" />
            <div className="hawaii-section-text">
              <p>
                Nach der Schule: essen gehen, Strand, manchmal nichts. Der Waikiki
                Beach ist touristisch – nachmittags, wenn die Massen weg sind, ist
                er aber ganz gut.
              </p>
            </div>
            <HawaiiCarousel
              label="Nachmittage in Waikiki"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237679/pages/travel/hawaii/videos/alltag_beach.jpg',
                  alt: 'Duke Kahanamoku Statue am Waikiki Beach',
                  caption:
                    'Duke Kahanamoku – der Vater des modernen Surfens. Passender Ort für eine Statue.',
                },
                {
                  type: 'video',
                  src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237680/pages/travel/hawaii/videos/alltag_jump.mp4',
                  label: 'Sprung ins Wasser am Waikiki Beach',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237682/pages/travel/hawaii/videos/alltag_waikiki_beach.jpg',
                  alt: 'Feuerwerk am Waikiki Beach freitagabends',
                  caption:
                    'Freitags gibt es am Waikiki Beach Feuerwerk. Klingt touristisch – ist es auch. Trotzdem jedes Mal schön.',
                },
                {
                  type: 'video',
                  src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237685/pages/travel/hawaii/videos/alltag_deeptalk.mp4',
                  label: 'Abend am Strand mit neuen Bekanntschaften',
                  caption:
                    'Abende am Strand mit Leuten, die man zwei Wochen vorher noch nicht kannte.',
                },
              ]}
            />
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
    </>
  );
}
