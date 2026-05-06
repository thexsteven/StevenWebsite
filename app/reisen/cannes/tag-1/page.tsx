import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Day 1 | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Day 1: first full day on the road, an unexpected welcome.',
};

export default function CannesTag1() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Day 1 — First Night on the Road"
        meta="June 22, 2025 · Rhine Cycling Path"
        summary="The first real day. Long stretches along the Rhine, legs burning in a good way, and an evening that reminded me why I do these things."
      />

      <div className="story-content">
        <p>
          Day one began with a healthy mix of excitement and mild chaos. The
          route along the Rhine was flat and straightforward — the kind of
          riding that lets your mind wander while your legs fall into rhythm.
          Fields, trees, the river beside me. It felt easy. Too easy, part of
          me thought.
        </p>
        <p>
          The kilometres passed. The Rhine valley opened up, wide and green
          under a grey sky that couldn't quite decide whether it wanted to
          rain. By mid-afternoon I'd already covered more ground than expected,
          and the legs were talking but not complaining.
        </p>
        <p>
          What I didn't expect was how quickly strangers would become part of
          the story. Sitting down to rest at a terrace, a cold drink in hand,
          watching the mountains start to define the horizon — that moment of
          stopping and just being somewhere new with everything you own on a
          bicycle beside you. That's a specific kind of freedom. A cold Wanda
          beer and the sound of the outdoors. Day one, done.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 22, 2025' },
            { label: 'Route', value: 'Konstanz → Rhine path south' },
            { label: 'Terrain', value: 'Flat river path' },
            { label: 'Overnight', value: 'Camping · Feldkirch area' },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile" style={{ gridColumn: '1 / -1' }}>
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237647/pages/travel/cannes/images/2_Reto_.jpg"
            alt="A cold Wanda beer on a terrace table – mountains visible in the background after the first day of cycling"
            style={{
              width: '50%',
              height: '100%',
              objectFit: 'cover',
              maxHeight: 520,
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          {
            href: '/reisen/cannes/startpunkt-konstanz',
            label: 'Previous: Starting Point Konstanz',
            ghost: true,
          },
          { href: '/reisen/cannes/tag-2', label: 'Next: Day 2' },
        ]}
      />
    </section>
  );
}
