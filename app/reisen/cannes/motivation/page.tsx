import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { CannesRouteMap } from '@/components/CannesRouteMap';

export const metadata: Metadata = {
  title: 'Cannes · Motivation | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Motivation: spontaneous, self-funded, no prior experience.',
};

export default function CannesMotivation() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Motivation"
        meta="June 2025 · ~900 km · 3 Countries"
        summary="No job. A cheap tent. A bike I had never ridden long-distance. That was all I needed. Sometimes the best ideas are the ones you don't overthink."
      />

      <div className="story-content">
        <p>
          After finishing my Technician degree in February 2025 and before my
          Computer Science studies at DHBW Mosbach were set to begin in
          September, I had a rare window of freedom — time without obligation,
          without a schedule, without a plan. Most people would have used it to
          rest.
        </p>
        <p>I decided to cycle from Konstanz to Cannes.</p>
        <p>
          There was no grand backstory. No years of preparation. I had done the
          Hawaii language trip just before this, come back to Germany, and
          found myself with energy to burn and no reason to sit still. A friend
          was in Cannes. The weather was getting warm. I looked at a map, saw
          the route, and thought: <em>why not?</em>
        </p>
        <p>
          I bought a second-hand touring bike, packed a lightweight tent,
          grabbed some basic camping gear, and booked a one-way train ticket to
          Konstanz — the southernmost point of Germany on Lake Constance. The
          plan: ride south. Cross the Alps. Get to France. Figure out the rest
          on the road.
        </p>
        <p>
          No cycling experience. No GPS device. No support vehicle. Just the
          bike, the road, and whatever came next.
        </p>

        <StoryHighlights
          items={[
            { label: 'Total Distance', value: '~900 km' },
            {
              label: 'Countries',
              value: 'Germany · Switzerland · Italy · France',
            },
            { label: 'Alpine Crossings', value: '2 × (incl. 2,700 m)' },
            { label: 'Budget', value: 'Self-funded, minimal' },
            { label: 'Cycling experience', value: 'None' },
            { label: 'Duration', value: '~10 days' },
          ]}
        />
      </div>

      <div
        className="story-media-grid"
        aria-label="Route overview"
        style={{ gridTemplateColumns: '1fr' }}
      >
        <CannesRouteMap
          className="media-tile"
          style={{ minHeight: 420, padding: 0, overflow: 'hidden' }}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div
          className="media-tile"
          style={{ minHeight: 300, padding: 0, overflow: 'hidden' }}
        >
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237637/pages/travel/cannes/images/Fahrrad_Abschluss.jpg"
            alt="The Bike"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div
          className="media-tile"
          style={{ minHeight: 300, padding: 0, overflow: 'hidden' }}
        >
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237639/pages/travel/cannes/images/1_Tour_Start.jpg"
            alt="The Gear"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div
          className="media-tile"
          style={{ minHeight: 300, padding: 0, overflow: 'hidden' }}
        >
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237641/pages/travel/cannes/images/Abschied_Biwakhu%CC%88tte.jpg"
            alt="Abschied Biwakhütte"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          { href: '/#travel', label: 'Back to Overview', ghost: true },
          {
            href: '/reisen/cannes/startpunkt-konstanz',
            label: 'Next: Starting Point Konstanz',
          },
        ]}
      />
    </section>
  );
}
