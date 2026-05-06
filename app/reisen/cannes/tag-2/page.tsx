import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Day 2 | Steven',
  description:
    "Cycling trip Konstanz to Cannes – Day 2: along the Rhine to Chur, a stranger's generosity.",
};

export default function CannesTag2() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Day 2 — Along the Rhine to Chur"
        meta="June 23, 2025 · Rhine Valley → Chur, Switzerland"
        summary="A wide river, a deep gorge, and an old man who gave me money for my next camping night. The world is full of good people."
      />

      <div className="story-content">
        <p>
          Day two was about finding a rhythm. The Rhine Gorge — sometimes
          called the "Swiss Grand Canyon" — opened up somewhere south of Chur,
          and nothing could have prepared me for the scale of it. Rocky walls
          dropping hundreds of metres, dense forest clinging to the slopes,
          and a turquoise river threading through the valley far below. I
          stopped at a viewpoint and just stared for a while.
        </p>
        <p>
          The riding itself was a long, steady push — not brutal, but
          consistent. Switzerland's road infrastructure is almost unfairly good
          for cycling: smooth tarmac, clear signage, and mountain air cool
          enough to make the effort feel manageable even under a blazing June
          sky.
        </p>
        <p>
          The highlight of the day came not from the landscape but from a
          retiree near Chur. We got talking, and he invited me to pitch my
          tent in his garden for the night. Before I left the next morning, he
          pressed some cash into my hand — for camping fees ahead, he said. I
          hadn't asked. He just did it. Some moments on a long journey stay
          with you permanently. This was one of them.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'June 23, 2025' },
            { label: 'Route', value: 'Rhine Valley → Chur' },
            { label: 'Highlight', value: 'Rhine Gorge viewpoint' },
            { label: 'Overnight', value: "Retiree's garden · Chur area" },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile" style={{ gridColumn: '1 / -1' }}>
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237649/pages/travel/cannes/images/View_wrong_way.jpg"
            alt="The Rhine Gorge near Chur – dramatic alpine landscape with forested rocky cliffs and a river far below under a vivid blue sky"
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
            href: '/reisen/cannes/tag-1',
            label: 'Previous: Day 1',
            ghost: true,
          },
          { href: '/reisen/cannes/tag-3', label: 'Next: Day 3' },
        ]}
      />
    </section>
  );
}
