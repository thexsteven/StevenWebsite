import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiSectionHeader } from '@/components/HawaiiSectionHeader';
import { HawaiiCarousel } from '@/components/sections/HawaiiCarousel';

export const metadata: Metadata = {
  title: 'Hawaii · Big Island | Steven',
  description:
    "Hawaii Sprachreise – Big Island: Mauna Kea Sonnenuntergang, Punalu'u Black Sand Beach, Manta-Ray-Tauchen und ein Wochenende zu siebt im Hawaiian Paradise Park.",
};

export default function HawaiiBigIsland() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Big Island"
        meta="März / April 2025 · Hawai'i Island"
        summary="7 Leute, ein Haus, ein Wochenende. Mauna Kea, Lavafelder, Manta Rays – alles in 48 Stunden."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            { label: 'Gruppe', value: '7 Personen aus der EF School' },
            {
              label: 'Unterkunft',
              value: 'Hawaiian Paradise Park, Puna District',
            },
            {
              label: 'Highlights',
              value: "Mauna Kea · Punalu'u · Manta Ray Dive",
            },
            { label: 'Vibe', value: 'Weniger touristisch – viel echter' },
          ]}
        />

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Hawaiian Paradise Park" />
          <div className="hawaii-section-text">
            <p>
              Zu siebt nach Big Island – nicht geplant, aber genau zum richtigen
              Zeitpunkt. Ein kleines Haus im Puna District, kein Resort, kein
              Touristenviertel.
            </p>
          </div>
          <HawaiiCarousel
            label="Hawaiian Paradise Park"
            slides={[
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774708801/Wohnhaus_flur_ixjq0e.jpg',
                alt: 'Flur unseres Hauses im Hawaiian Paradise Park',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774708849/Kamehameha_street_laxcfw.jpg',
                alt: 'Kamehameha Avenue – typische Straße auf Big Island',
                caption:
                  'Big Island fühlt sich anders an als Oahu. Weite Teile sind einfach leer – Lavafelder bis zum Horizont, kaum Betrieb.',
              },
            ]}
          />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Mauna Kea · 4.207 m" />
          <div className="hawaii-section-text">
            <p>
              Höchster Punkt Hawaiis. Nachmittags hochgefahren, Sonnenuntergang
              oben abgewartet, dann schnell wieder runter – Mietwagen-Vertrag
              verbietet die Strecke bei Dunkelheit.
            </p>
          </div>
          <HawaiiCarousel
            label="Mauna Kea"
            slides={[
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774708654/MaunaKeaPause_mkhvfh.mp4',
                label: 'Mauna Kea – Pause auf dem Weg zum Gipfel',
                caption:
                  'Auf dem Weg nach oben – durch die Wolken. Die letzten Kilometer sind Schotterpiste.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709605/MaunakeaSunset_ouuchw.jpg',
                alt: 'Sonnenuntergang am Mauna Kea – Blick über die Wolkendecke',
                caption: 'Über den Wolken. Tief orange, fast brennend.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709650/MaunakeaSunset2_k0ceor.jpg',
                alt: 'Mauna Kea – Vulkanlandschaft beim Sonnenuntergang',
                caption:
                  'Rote Erde, Observatorien, wenig Luft. Einer der Momente auf dieser Reise, die man nicht nachmacht.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774704030/coolesAuto_yz90ds.jpg',
                alt: 'Mietwagen auf Big Island',
              },
            ]}
          />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Pahoa · Lavafelder" />
          <div className="hawaii-section-text">
            <p>
              Das war quasi unsere Nachbarschaft. 2018 hat Kīlauea ganze
              Straßenzüge begraben. Straßen, die irgendwo abrupt enden.
            </p>
          </div>
          <HawaiiCarousel
            label="Pahoa Lavafelder"
            slides={[
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709983/PahoaVolcano_xgrqzu.mov',
                label: 'Lavalandschaft bei Pahoa, Big Island',
                caption:
                  'Keine Pflanzen, kein Lärm – nur schwarzes Gestein. Und direkt daneben dichter Dschungel.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774704305/jungle_uzfy6s.jpg',
                alt: 'Dichter Dschungel auf Big Island, Puna District',
              },
            ]}
          />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Punalu'u · Black Sand Beach" />
          <div className="hawaii-section-text">
            <p>
              Komplett schwarzer Sand aus zerkleinertem Lavastein. Und
              Schildkröten – echte, ausgewachsene Green Sea Turtles, die einfach
              am Strand liegen.
            </p>
          </div>
          <HawaiiCarousel
            label="Punalu'u Black Sand Beach"
            slides={[
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709316/PunaluuBeachpark_mrvsqs.jpg',
                alt: "Punalu'u Beach Park – schwarzer Sandstrand mit Palmen",
                caption:
                  'Schwarzer Sand, türkisfarbenes Wasser, grüne Palmen. Der Kontrast ist so krass, dass man kurz denkt, das kann nicht echt sein.',
              },
              {
                type: 'image',
                src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774703659/Blasksandhaus_lugi4s.jpg',
                alt: "Schwarzer Sand – Strand und Haus bei Punalu'u",
              },
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709190/BlackSandBeach_ds6nzm.mov',
                label: "Punalu'u Black Sand Beach – Video",
                caption:
                  'Kein Zoo. Die kommen einfach raus. Nah genug, um sie atmen zu sehen.',
              },
            ]}
          />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Manta Ray Night Dive" />
          <div className="hawaii-section-text">
            <p>
              Einer der Hauptgründe für das Wochenende. Boot raus, Lichtrahmen
              im Wasser, nach unten schauen – und dann kommen sie.
            </p>
          </div>
          <HawaiiCarousel
            label="Manta Ray Night Dive"
            slides={[
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709508/Mantarochen_ff91y2.mp4',
                label: 'Mantarochen beim Nacht-Tauchen vor der Kona-Küste',
                caption:
                  'Mantarochen mit 2–3 m Spannweite, in ruhigen Spiralen direkt unter einem. Die interessieren sich überhaupt nicht für uns – die machen einfach ihre Runden.',
              },
            ]}
          />
        </div>

        <div className="hawaii-section">
          <HawaiiSectionHeader title="Abende im Haus" />
          <HawaiiCarousel
            label="Abende im Haus"
            slides={[
              {
                type: 'video',
                src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774708951/whirlpoolPause_ifpes0.mp4',
                label: 'Pause im Whirlpool – Abend im Haus auf Big Island',
                caption:
                  'Abends im Haus: Musik, kochen, Leute aus verschiedenen Ländern, die sich irgendwie verstehen. Genau das, wofür man sechs Wochen auf die andere Seite der Welt fliegt.',
              },
            ]}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          {
            href: '/reisen/hawaii/adventures',
            label: 'Vorheriges Kapitel: Adventures',
            ghost: true,
          },
          {
            href: '/reisen/hawaii/essen-kultur',
            label: 'Nächstes Kapitel: Essen & Kultur',
          },
        ]}
      />
    </section>
  );
}
