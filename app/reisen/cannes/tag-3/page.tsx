import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Day 3 | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Day 3: 120 km detour, the Alps begin, first real hardship.',
};

export default function CannesTag3() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Day 3 — Into the Alps"
        meta="June 24, 2025 · Swiss Alps · Splügen Pass area"
        summary="A 120 km detour through a routing mistake. Snow-capped peaks on the horizon. And the realisation that the mountains don't negotiate."
      />

      <div className="story-content">
        <p>
          Day three was the day things got real. A wrong turn — or rather, a
          routing decision that seemed logical on the map but wasn't — added
          roughly 120 extra kilometres to the day. By the time I figured it
          out, there was nothing to do but keep pedalling.
        </p>
        <p>
          But the detour delivered something unexpected: a completely
          different slice of Switzerland. Quieter roads, smaller villages,
          longer climbs. And then the Alps appeared — not gradually, but
          suddenly, like a wall of rock and snow rising at the end of every
          valley. You can look at images of the Alps a thousand times and
          still not be prepared for the feeling of standing at their foot on a
          bicycle with everything you own, knowing you have to go over them.
        </p>
        <p>
          That moment, looking up at the snow-capped ridgeline against a
          perfect blue sky, loaded bike beside me, exhausted but completely
          alive — that's the image I carry from this day. The mountains don't
          care about your plans. You adjust. You climb.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 24, 2025' },
            { label: 'Detour', value: '~120 km extra' },
            { label: 'Terrain', value: 'Alpine climbs begin' },
            { label: 'Overnight', value: 'Camping Splügen' },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile" style={{ gridColumn: '1 / -1' }}>
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239656/pages/travel/cannes/images/june24-alpine-pass.png"
            alt="Steven standing at the edge of an alpine road, back to the camera, looking at snow-capped mountain peaks – loaded bike with yellow rain cover visible beside him"
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
            href: '/reisen/cannes/tag-2',
            label: 'Previous: Day 2',
            ghost: true,
          },
          { href: '/reisen/cannes/tag-4', label: 'Next: Day 4' },
        ]}
      />
    </section>
  );
}
