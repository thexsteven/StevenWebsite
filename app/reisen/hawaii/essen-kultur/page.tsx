import type { Metadata } from 'next';
import { HawaiiStoryHero } from '@/components/HawaiiStoryHero';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { HawaiiSectionHeader } from '@/components/HawaiiSectionHeader';
import { HawaiiCarousel } from '@/components/sections/HawaiiCarousel';
import { HawaiiEssenMap } from '@/components/HawaiiEssenMap';

export const metadata: Metadata = {
  title: 'Hawaii · Essen & Kultur | Steven',
  description:
    'Hawaii Sprachreise – Essen & Kultur: Poke Bowls, Food Trucks auf Cartwright Road, Bambus-Smoothie und Amerikanisierung auf Oahu.',
};

export default function HawaiiEssenKultur() {
  return (
    <>
      <HawaiiStoryHero
        slug="essen-kultur"
        eyebrow="Hawaii Sprachreise"
        titleId="story-title"
        title="Essen & Kultur"
        meta="März – April 2025 · Oahu"
        place="Foodtrucks am Kapiolani Park mit dem Diamond Head, Waikiki"
        summary="Poke Bowl an jeder Ecke, Food Trucks auf der Cartwright Road, Raising Cane's mit Schlange bis zum Bürgersteig."
      />

      <section className="story-detail" aria-labelledby="story-title">
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

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Poke Bowl" />
            <div className="hawaii-section-text">
              <p>
                Das Gericht der Insel. Jede Tankstelle, jeder Supermarkt, jedes
                kleine Restaurant hat sie – und sie schmeckt jedes Mal anders. Und
                jedes Mal gut.
              </p>
            </div>
            <HawaiiCarousel
              label="Poke Bowl"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240022/pages/travel/hawaii/videos/PokeBowl.jpg',
                  alt: 'Poke Bowl auf Oahu',
                  caption:
                    'Frischer Thunfisch, Sojasauce, Sesamöl, Avocado, Edamame. Kein Trend – hier einfach Lebensmittel.',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240030/pages/travel/hawaii/videos/Acai_Bowl_.jpg',
                  alt: 'Açaí Bowl',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240032/pages/travel/hawaii/videos/ChickenBowl.jpg',
                  alt: 'Chicken Bowl',
                },
              ]}
            />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Food Trucks · Cartwright Road" />
            <div className="hawaii-section-text">
              <p>
                Ein Dutzend Trucks nebeneinander, jeden Tag. Jeder mit einem
                anderen Konzept. Die Warteschlangen zeigen, wo man richtig ist.
              </p>
            </div>
            <HawaiiCarousel
              label="Food Trucks an der Cartwright Road"
              slides={[
                {
                  type: 'video',
                  src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237698/pages/travel/hawaii/videos/Foodtruck.mov',
                  label: 'Food Trucks an der Cartwright Road',
                  caption:
                    'Cartwright Road, direkt am Kapiolani Park. Ich bin mehr als einmal zurückgekommen.',
                },
                {
                  type: 'video',
                  src: 'https://res.cloudinary.com/dozdjb4fi/video/upload/v1774237709/pages/travel/hawaii/videos/FoodtrucksSmoothie.mov',
                  label: 'Bambus-Smoothie am Food Truck',
                  caption:
                    'Bambus-Smoothie: frisches Bambus, direkt ausgepresst, mit Früchten. Grün, leicht süßlich, erdiger Unterton.',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240025/pages/travel/hawaii/videos/FoodtruckBurger.jpg',
                  alt: 'Burger am Food Truck',
                  caption:
                    'Burger-Truck – saftige Patties, handgemachte Saucen, auf einer Parkbank mit Blick auf den Ozean.',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240034/pages/travel/hawaii/videos/HotDog.jpg',
                  alt: 'Hot Dog am Foodtruck',
                },
              ]}
            />
            <HawaiiEssenMap className="hawaii-section-map" />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Shaved Ice · Rainbow Drive-In · Betty's Burger" />
            <HawaiiCarousel
              label="Shaved Ice und Rainbow Drive-In"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237736/pages/travel/hawaii/videos/Ice.jpg',
                  alt: 'Shaved Ice',
                  caption:
                    'Shaved Ice – Pflicht auf Hawaii. Himbeere, Mango, Kokosnuss.',
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240037/pages/travel/hawaii/videos/RainbowRestaurant.jpg',
                  alt: 'Rainbow Drive-In',
                  caption:
                    'Rainbow Drive-In – seit 1961, Plate Lunch, kein Schnickschnack.',
                },
              ]}
            />
          </div>

          <div className="hawaii-section">
            <HawaiiSectionHeader title="Americanization" />
            <div className="hawaii-section-text">
              <p>
                Eine Insel mit reicher, eigener Esskultur – und an jeder zweiten
                Ecke Raising Cane's, McDonald's, Subway. Der Kontrast ist real.
              </p>
            </div>
            <HawaiiCarousel
              label="Americanization"
              slides={[
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240027/pages/travel/hawaii/videos/RaisingCanes.jpg',
                  alt: "Raising Cane's in Honolulu",
                  caption:
                    "Raising Cane's – fast ausschließlich Chicken Fingers auf der Karte, trotzdem Schlangen bis auf den Bürgersteig.",
                },
                {
                  type: 'image',
                  src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774240040/pages/travel/hawaii/videos/BettysBurger.jpg',
                  alt: "Betty's Burger",
                },
              ]}
            />
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
    </>
  );
}
