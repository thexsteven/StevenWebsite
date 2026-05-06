import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Day 4 | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Day 4: Switzerland done, first night in Italy under a railway bridge.',
};

export default function CannesTag4() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Day 4 — Switzerland Done, Italy Begins"
        meta="June 25, 2025 · Alps → Northern Italy"
        summary="The first Alpine crossing complete. A lakeside campsite in northern Italy and one night sleeping under a railway bridge. Highs and lows, literally."
      />

      <div className="story-content">
        <p>
          Crossing into Italy felt monumental. Switzerland had been stunningly
          beautiful but also relentlessly demanding — the climbs, the
          altitude, the sheer scale of everything. Coming down the other side
          of the Alps, the air got warmer, the road signs switched language,
          and something shifted in the atmosphere. Europe feels different
          country by country, and Italy announces itself immediately.
        </p>
        <p>
          The descent brought me to a lake campsite unlike anything I'd
          expected to find in northern Italy — turquoise water, palm trees, a
          cycling path running right past the entrance. The kind of place
          you'd normally book months in advance. I just rolled in, pitched the
          tent, and sat by the water for a long time.
        </p>
        <p>
          Later that evening, circumstances and budget meant improvising a
          sleeping spot under a railway bridge. It sounds worse than it was.
          Dry, sheltered, and with a certain rough poetry to it — the kind of
          accommodation you only get when you're moving through the world
          without a fixed plan. That's where day four ended: under Italian
          stars, listening to the odd train pass overhead.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 25, 2025' },
            { label: 'Milestone', value: 'First Alpine crossing complete' },
            { label: 'Entered', value: 'Italy 🇮🇹' },
            { label: 'Overnight', value: 'Lake campsite + railway bridge' },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile" style={{ gridColumn: '1 / -1' }}>
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239658/pages/travel/cannes/images/june25-lake-camping.png"
            alt="A lakeside campsite in northern Italy – turquoise lake surrounded by mountains, a bell tent and palm trees visible, cycling heart logo on the road"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxHeight: 560,
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          {
            href: '/reisen/cannes/tag-3',
            label: 'Previous: Day 3',
            ghost: true,
          },
          {
            href: '/reisen/cannes/abschnitt-italien',
            label: 'Next: Italy Section',
          },
        ]}
      />
    </section>
  );
}
