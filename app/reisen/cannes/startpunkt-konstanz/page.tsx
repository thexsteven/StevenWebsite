import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Starting Point Konstanz | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Starting Point Konstanz: geared up and ready to roll.',
};

export default function CannesStartpunkt() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Starting Point Konstanz"
        meta="June 21, 2025 · Day 0"
        summary="Helmet on. Vest packed. Legs ready. Standing at Lake Constance with a loaded bike and a one-way ticket — this was the real start."
      />

      <div className="story-content">
        <p>
          Getting to Konstanz by train with a fully loaded touring bike is an
          adventure in itself. Navigating through the carriages, squeezing past
          doors, making sure nothing toppled — by the time I arrived at the
          station I was already sweating, and I hadn't turned a single pedal
          yet.
        </p>
        <p>
          Konstanz sits right on the shore of Lake Constance (
          <em>Bodensee</em>), at the southernmost tip of Germany. Standing
          there, looking south toward Switzerland, everything became suddenly
          very real. The hydration vest was loaded, the panniers were packed,
          the helmet was on. No plan beyond "go south, cross the mountains,
          reach France."
        </p>
        <p>
          I took a moment to breathe it in — the smell of the lake, the warm
          June air, the buzz of summer. Then I clipped in, pointed the wheels
          south, and started pedalling. That first kilometre felt like a
          thousand promises.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 21, 2025' },
            { label: 'Start', value: 'Konstanz, Lake Constance' },
            {
              label: 'Gear',
              value: 'Helmet · Hydration vest · Panniers',
            },
            {
              label: 'Mood',
              value: 'Focused · Excited · A little nervous',
            },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile" style={{ gridColumn: '1 / -1' }}>
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237643/pages/travel/cannes/images/21062025_Bild_von_mir_.jpg"
            alt="Steven in cycling gear at the start of the tour – helmet, sunglasses and hydration vest on, train tracks visible in background"
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
            href: '/reisen/cannes/motivation',
            label: 'Previous: Motivation',
            ghost: true,
          },
          { href: '/reisen/cannes/tag-1', label: 'Next: Day 1' },
        ]}
      />
    </section>
  );
}
