import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiEssenMap } from '@/components/HawaiiEssenMap';

export const metadata: Metadata = {
  title: 'Hawaii · Essen & Kultur | Steven',
  description:
    'Hawaii Sprachreise – Essen & Kultur: Poke Bowls, Food Trucks auf Cartwright Road, Bambus-Smoothie und Amerikanisierung auf Oahu.',
};

export default function HawaiiEssenKultur() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Zurück zur Reise‑Übersicht" />

      <StoryDetailHeader
        kicker="Hawaii Sprachreise"
        titleId="story-title"
        title="Essen & Kultur"
        meta="März – April 2025 · Oahu"
        summary="Poke Bowl an jeder Ecke, Food Trucks auf der Cartwright Road, Raising Cane's mit Schlange bis zum Bürgersteig."
      />

      <div className="story-content">
        <StoryHighlights
          items={[
            { label: 'Insel', value: 'Oahu' },
            { label: 'Hotspot', value: 'Food Trucks · Cartwright Road' },
            {
              label: 'Must-try',
              value: 'Poke Bowl · Açaí Bowl · Bambus-Smoothie',
            },
            {
              label: 'Americanization',
              value: "Raising Cane's · Betty's Burger",
            },
            { label: 'Zeitraum', value: 'März – April 2025' },
          ]}
        />

        <div className="album-grid">
          <div className="album-section">
            <h2>Poke Bowl</h2>
            <p>
              Das Gericht der Insel. Jede Tankstelle, jeder Supermarkt, jedes
              kleine Restaurant hat sie – und sie schmeckt jedes Mal anders. Und
              jedes Mal gut.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240022/pages/travel/hawaii/videos/PokeBowl.jpg"
              alt="Poke Bowl auf Oahu"
              loading="lazy"
            />
            <figcaption>
              Frischer Thunfisch, Sojasauce, Sesamöl, Avocado, Edamame. Kein
              Trend – hier einfach Lebensmittel.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240030/pages/travel/hawaii/videos/Acai_Bowl_.jpg"
              alt="Açaí Bowl"
              loading="lazy"
            />
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240032/pages/travel/hawaii/videos/ChickenBowl.jpg"
              alt="Chicken Bowl"
              loading="lazy"
            />
          </figure>

          <div className="album-section">
            <h2>Food Trucks · Cartwright Road</h2>
            <p>
              Ein Dutzend Trucks nebeneinander, jeden Tag. Jeder mit einem
              anderen Konzept. Die Warteschlangen zeigen, wo man richtig ist.
            </p>
          </div>

          <figure className="album-item album-item--wide">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237698/pages/travel/hawaii/videos/Foodtruck.mov"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Cartwright Road, direkt am Kapiolani Park. Ich bin mehr als einmal
              zurückgekommen.
            </figcaption>
          </figure>

          <figure className="album-item">
            <video controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237709/pages/travel/hawaii/videos/FoodtrucksSmoothie.mov"
                type="video/mp4"
              />
              Dein Browser unterstützt dieses Videoformat leider nicht.
            </video>
            <figcaption>
              Bambus-Smoothie: frisches Bambus, direkt ausgepresst, mit
              Früchten. Grün, leicht süßlich, erdiger Unterton.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240025/pages/travel/hawaii/videos/FoodtruckBurger.jpg"
              alt="Burger am Food Truck"
              loading="lazy"
            />
            <figcaption>
              Burger-Truck – saftige Patties, handgemachte Saucen, auf einer
              Parkbank mit Blick auf den Ozean.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240034/pages/travel/hawaii/videos/HotDog.jpg"
              alt="Hot Dog am Foodtruck"
              loading="lazy"
            />
          </figure>

          <HawaiiEssenMap className="album-item album-item--wide album-map" />

          <div className="album-section">
            <h2>Shaved Ice · Rainbow Drive-In · Betty's Burger</h2>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237736/pages/travel/hawaii/videos/Ice.jpg"
              alt="Shaved Ice"
              loading="lazy"
            />
            <figcaption>
              Shaved Ice – Pflicht auf Hawaii. Himbeere, Mango, Kokosnuss.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240037/pages/travel/hawaii/videos/RainbowRestaurant.jpg"
              alt="Rainbow Drive-In"
              loading="lazy"
            />
            <figcaption>
              Rainbow Drive-In – seit 1961, Plate Lunch, kein Schnickschnack.
            </figcaption>
          </figure>

          <div className="album-section">
            <h2>Americanization</h2>
            <p>
              Eine Insel mit reicher, eigener Esskultur – und an jeder zweiten
              Ecke Raising Cane's, McDonald's, Subway. Der Kontrast ist real.
            </p>
          </div>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240027/pages/travel/hawaii/videos/RaisingCanes.jpg"
              alt="Raising Cane's in Honolulu"
              loading="lazy"
            />
            <figcaption>
              Raising Cane's – fast ausschließlich Chicken Fingers auf der
              Karte, trotzdem Schlangen bis auf den Bürgersteig.
            </figcaption>
          </figure>

          <figure className="album-item">
            <img
              src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240040/pages/travel/hawaii/videos/BettysBurger.jpg"
              alt="Betty's Burger"
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      <StoryPagination
        ariaLabel="Kapitelnavigation"
        actions={[
          {
            href: '/reisen/hawaii/big-island',
            label: 'Vorheriges Kapitel: Big Island',
            ghost: true,
          },
          {
            href: '/reisen/hawaii/abschluss',
            label: 'Nächstes Kapitel: Abschluss',
          },
        ]}
      />
    </section>
  );
}
