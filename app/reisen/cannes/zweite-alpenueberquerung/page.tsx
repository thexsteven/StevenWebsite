import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Second Alpine Crossing | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Second Alpine crossing: no path, rocky terrain, carrying the bike, mountain lake at 2700m.',
};

export default function CannesZweiteAlpen() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Second Alpine Crossing — 2,700 m"
        meta="June 30, 2025 · Maritime Alps · Italy → France"
        summary="No proper path. Loose rock. Carrying the bike on my back for hours. A mountain lake at altitude that looked like it was from another world. And on the other side: France."
      />

      <div className="story-content">
        <p>
          The second Alpine crossing was in a completely different category
          from the first. Splügen had been a proper mountain pass with a real
          road. The Maritime Alps — between Cuneo and the French Riviera —
          were something else entirely. The route I had planned looked clean
          on a map. On the ground it turned into loose scree, steep rocky
          faces, and sections where no path existed at all.
        </p>
        <p>
          I ended up carrying the bike. Lifting it section by section, over
          rocks, up slopes too steep and unstable to ride. The weight of a
          loaded touring bike in that terrain is difficult to describe — it
          demands everything from your legs, arms, shoulders, and whatever
          reserves of stubbornness you have left after a week of cycling.
        </p>
        <p>
          And then — completely unexpectedly — a mountain lake appeared. High
          in the cirque, hemmed in by jagged grey peaks, an emerald-green
          alpine lake sat perfectly still, reflecting the overcast sky. I
          stopped, dropped the bike, and just laughed. Not because anything
          was funny. Because sometimes you reach a point of effort where the
          only response is pure, unfiltered joy. That photo — eyes closed,
          helmet on, rain jacket, laughing into the cold mountain air — is
          probably the truest picture of the whole trip.
        </p>
        <p>France was on the other side. One more descent to go.</p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 30, 2025' },
            { label: 'Max altitude', value: '~2,700 m' },
            {
              label: 'Terrain',
              value: 'Scree · No path · Bike carried',
            },
            { label: 'Reward', value: 'Alpine mountain lake 🏔️' },
          ]}
        />
      </div>

      <div
        className="story-media-grid"
        aria-label="Media gallery"
        style={{ gridTemplateColumns: '1fr' }}
      >
        <div className="media-tile image-tile">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239660/pages/travel/cannes/images/june30-alpine-lake.jpg"
            alt="Steven laughing with eyes closed at a high-altitude mountain lake in the Maritime Alps – helmet and rain jacket on, emerald green lake and jagged rocky peaks behind him"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxHeight: 640,
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          {
            href: '/reisen/cannes/abschnitt-italien',
            label: 'Previous: Italy Section',
            ghost: true,
          },
          {
            href: '/reisen/cannes/ankunft-suedfrankreich',
            label: 'Next: Arrival in Southern France',
          },
        ]}
      />
    </section>
  );
}
