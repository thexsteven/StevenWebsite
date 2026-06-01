import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiSectionHeader } from '@/components/HawaiiSectionHeader';
import { HawaiiCarousel } from '@/components/sections/HawaiiCarousel';
import { HawaiiFlightMap } from '@/components/HawaiiFlightMap';

export const metadata: Metadata = {
  title: 'Hawaii · Flug & Ankunft | Steven',
  description:
    'Hawaii Sprachreise – Flug & Ankunft: FRA → ORD → HNL, Flugdaten, Strecke und erste Eindrücke am Hotel Waikiki Malia.',
};

export default function HawaiiFlugAnkunft() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Flug & Ankunft"
        meta="02.03.2025"
        summary='Frankfurt. Chicago. Honolulu. ~20 Stunden, drei Zeitzonen – und am Ende davon: warme Luft, Palmen und ein „Aloha" an der Rezeption.'
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            { label: 'Abflug', value: '02.03.2025 · Frankfurt (FRA)' },
            { label: 'Stopover', value: "Chicago O'Hare (ORD)" },
            { label: 'Ankunft', value: 'Honolulu (HNL)' },
            { label: 'Luftlinie', value: '~11.990 km' },
            { label: 'FRA → ORD', value: '~7.500 km · ca. 9 h' },
            { label: 'ORD → HNL', value: '~7.000 km · ca. 9 h' },
            { label: 'Gesamt-Flugzeit', value: '~20 Stunden (ohne Layover)' },
            { label: 'Zeitzone Hawaii', value: 'HST · UTC−10 · −11 h zu DE' },
            { label: 'Hotel', value: 'Waikiki Malia, Honolulu' },
          ]}
        />

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Der Flug · FRA → ORD → HNL" />
          <div className="hawaii-section-text">
            <p>
              Am FRA-Flughafen war es früh morgens, das Terminal noch ruhig.
              Boarding-Pass, Koffer, und 20 Stunden Flug vor mir. Erster
              Abschnitt: über den Atlantik nach Chicago. 7.500 km, neun Stunden,
              irgendwann sieht man nur noch Wasser.
            </p>
            <p>
              Chicago O'Hare: groß, laut, voller Energie. Meine erste Begegnung
              mit Amerika. Anschlussflug wartet, also nur kurz durchs Terminal –
              aber der erste Eindruck sitzt. Dann der entscheidende Abschnitt:
              7.000 km über den Pazifik, weitere neun Stunden. Ab einem
              bestimmten Punkt sieht man nur noch Wasser. Endlos.
            </p>
          </div>
          <HawaiiCarousel
            label="Flug nach Honolulu"
            slides={[
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237764/images/hawaii_content/Flug_Ankunft.mov',
                label: 'Flug FRA → ORD → HNL über dem Pazifik',
                caption: 'FRA → ORD → HNL. Irgendwo über dem Pazifik.',
              },
            ]}
          />
          <HawaiiFlightMap className="hawaii-section-map" />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Ankunft in Honolulu" />
          <div className="hawaii-section-text">
            <p>
              Landung in Honolulu. Die Luft am Terminal-Ausgang trifft einen
              sofort – warm, feucht, mit einem Blumenduft, den ich nicht
              einordnen kann. Hawaii riecht anders. Das Taxi nach Waikiki, durch
              Highways und Beton, und dann taucht der Diamond Head auf – einfach
              so, am Ende einer vierspurigen Straße. Ich hab ihn hundertmal auf
              Fotos gesehen. Hier sitzt er einfach da, als wäre er das Normalste
              der Welt.
            </p>
          </div>
          <HawaiiCarousel
            label="Ankunft in Honolulu"
            slides={[
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237768/pages/travel/hawaii/videos/me.jpg',
                alt: 'Ankunft in Honolulu',
                caption: 'Waikiki Malia, 2211 Kuhio Ave. Einen Block vom Strand.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240042/pages/travel/hawaii/videos/City_1.jpg',
                alt: 'Honolulu City',
                caption:
                  'Honolulu. Nicht das, was man sich vorstellt – und gleichzeitig genau das.',
              },
            ]}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          { href: '/#travel', label: 'Zur Übersicht', ghost: true },
          {
            href: '/reisen/hawaii/alltag',
            label: 'Nächstes Kapitel: Alltag',
          },
        ]}
      />
    </section>
  );
}
