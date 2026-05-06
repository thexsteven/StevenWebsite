import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

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

        <div className="album-grid">
          <div className="album-section">
            <h2>Hawaiian Paradise Park</h2>
            <p>
              Zu siebt nach Big Island – nicht geplant, aber genau zum richtigen
              Zeitpunkt. Ein kleines Haus im Puna District, kein Resort, kein
              Touristenviertel.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774708801/Wohnhaus_flur_ixjq0e.jpg"
              alt="Flur unseres Hauses im Hawaiian Paradise Park"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774708849/Kamehameha_street_laxcfw.jpg"
              alt="Kamehameha Avenue – typische Straße auf Big Island"
              loading="lazy"
            />
            <figcaption>
              Big Island fühlt sich anders an als Oahu. Weite Teile sind einfach
              leer – Lavafelder bis zum Horizont, kaum Betrieb.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Mauna Kea · 4.207 m</h2>
            <p>
              Höchster Punkt Hawaiis. Nachmittags hochgefahren, Sonnenuntergang
              oben abgewartet, dann schnell wieder runter – Mietwagen-Vertrag
              verbietet die Strecke bei Dunkelheit.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <video
              controls
              preload="metadata"
              aria-label="Mauna Kea – Pause auf dem Weg zum Gipfel"
            >
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774708654/MaunaKeaPause_mkhvfh.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Auf dem Weg nach oben – durch die Wolken. Die letzten Kilometer
              sind Schotterpiste.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709605/MaunakeaSunset_ouuchw.jpg"
              alt="Sonnenuntergang am Mauna Kea – Blick über die Wolkendecke"
              loading="lazy"
            />
            <figcaption>Über den Wolken. Tief orange, fast brennend.</figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709650/MaunakeaSunset2_k0ceor.jpg"
              alt="Mauna Kea – Vulkanlandschaft beim Sonnenuntergang"
              loading="lazy"
            />
            <figcaption>
              Rote Erde, Observatorien, wenig Luft. Einer der Momente auf dieser
              Reise, die man nicht nachmacht.
            </figcaption>
          </figure>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774704030/coolesAuto_yz90ds.jpg"
              alt="Mietwagen auf Big Island"
              loading="lazy"
            />
          </figure>

          <div className="album-section">
            <h2>Pahoa · Lavafelder</h2>
            <p>
              Das war quasi unsere Nachbarschaft. 2018 hat Kīlauea ganze
              Straßenzüge begraben. Straßen, die irgendwo abrupt enden.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <video
              controls
              preload="metadata"
              aria-label="Lavalandschaft bei Pahoa, Big Island"
            >
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709983/PahoaVolcano_xgrqzu.mov"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Keine Pflanzen, kein Lärm – nur schwarzes Gestein. Und direkt
              daneben dichter Dschungel.
            </figcaption>
          </figure>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774704305/jungle_uzfy6s.jpg"
              alt="Dichter Dschungel auf Big Island, Puna District"
              loading="lazy"
            />
          </figure>

          <div className="album-section">
            <h2>Punalu'u · Black Sand Beach</h2>
            <p>
              Komplett schwarzer Sand aus zerkleinertem Lavastein. Und
              Schildkröten – echte, ausgewachsene Green Sea Turtles, die einfach
              am Strand liegen.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774709316/PunaluuBeachpark_mrvsqs.jpg"
              alt="Punalu'u Beach Park – schwarzer Sandstrand mit Palmen"
              loading="lazy"
            />
            <figcaption>
              Schwarzer Sand, türkisfarbenes Wasser, grüne Palmen. Der Kontrast
              ist so krass, dass man kurz denkt, das kann nicht echt sein.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774703659/Blasksandhaus_lugi4s.jpg"
              alt="Schwarzer Sand – Strand und Haus bei Punalu'u"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <video
              controls
              preload="metadata"
              aria-label="Punalu'u Black Sand Beach – Video"
            >
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709190/BlackSandBeach_ds6nzm.mov"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Kein Zoo. Die kommen einfach raus. Nah genug, um sie atmen zu
              sehen.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Manta Ray Night Dive</h2>
            <p>
              Einer der Hauptgründe für das Wochenende. Boot raus, Lichtrahmen
              im Wasser, nach unten schauen – und dann kommen sie.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <video
              controls
              preload="metadata"
              aria-label="Mantarochen beim Nacht-Tauchen vor der Kona-Küste"
            >
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774709508/Mantarochen_ff91y2.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Mantarochen mit 2–3 m Spannweite, in ruhigen Spiralen direkt unter
              einem. Die interessieren sich überhaupt nicht für uns – die machen
              einfach ihre Runden.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Abende im Haus</h2>
          </div>

          <figure className="album-item album-item--wide">
            <video
              controls
              preload="metadata"
              aria-label="Pause im Whirlpool – Abend im Haus auf Big Island"
            >
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774708951/whirlpoolPause_ifpes0.mp4"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Abends im Haus: Musik, kochen, Leute aus verschiedenen Ländern,
              die sich irgendwie verstehen. Genau das, wofür man sechs Wochen
              auf die andere Seite der Welt fliegt.
            </figcaption>
          </figure>
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
