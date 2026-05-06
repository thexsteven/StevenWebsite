import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Italy Section | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Italy section: wild camping, pilgrim house, Turin, Cuneo.',
};

export default function CannesAbschnittItalien() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Italy — Heat, Pasta & Turin"
        meta="June 26–29, 2025 · Northern Italy · Turin · Cuneo"
        summary="Wild camping under trees. Making pasta from scratch at a pilgrim house. A stunning Turin arcade. And a workout stop in the Po Valley heat. Italy had everything."
      />

      <div className="story-content">
        <p>
          After crossing into Italy, the landscape flattened out into the Po
          Valley — long straight roads, searing heat, and a sky almost too
          blue to be real. The days in Italy were less about grinding
          kilometres and more about absorbing everything around me: the food,
          the people, the architecture.
        </p>
        <p>
          A pilgrim house near Mornago became an unexpected highlight. The
          kind of place run by volunteers, open to anyone on a long journey —
          walkers, cyclists, pilgrims of all kinds. The communal kitchen
          became the scene of one of the trip's best memories: making gnocchi
          from scratch with other guests, flour everywhere, someone's Italian
          grandmother's recipe, laughing over a chopping board. Travel does
          this — it creates moments you couldn't have planned.
        </p>
        <p>
          Turin was a full day off the bike and worth every minute. The city's
          covered arcades — <em>portici</em> and galleries — are unlike
          anything in Germany or Switzerland. Grand 19th-century architecture,
          marble floors, iron and glass ceilings. Just walking through the
          Galleria felt like stepping into a different century. Real coffee.
          Proper food. Rest.
        </p>
        <p>
          Then Cuneo — a quieter city at the foot of the Maritime Alps. One
          more workout at an outdoor gym (the legs needed movement, not rest),
          then the mountains appeared again on the horizon. The second
          crossing was next.
        </p>

        <StoryHighlights
          items={[
            { label: 'June 26', value: 'Wild camping · Northern Italy' },
            { label: 'June 27', value: 'Pilgrim house · Homemade pasta' },
            { label: 'June 28', value: 'Day off · Turin galleries' },
            { label: 'June 29', value: 'Outdoor gym · Cuneo' },
          ]}
        />
      </div>

      <div className="story-media-grid" aria-label="Media gallery">
        <div className="media-tile image-tile">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239644/pages/travel/cannes/images/june26-tent-morning.jpg"
            alt="Morning view from inside a bivouac tent – mesh fabric ceiling, blue sky and green trees visible, shoes at the foot end"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: 320,
            }}
          />
        </div>

        <div className="media-tile image-tile">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239646/pages/travel/cannes/images/june27-pilgrim-cooking.jpg"
            alt="Steven in a floral apron making gnocchi from scratch in the pilgrim house kitchen – flour on the table, peace sign, huge smile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: 320,
            }}
          />
        </div>

        <div className="media-tile image-tile">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239648/pages/travel/cannes/images/june28-turin-gallery.png"
            alt="The grand covered arcade in Turin – black and white marble floors, ornate arched glass ceiling, iron lanterns, elegant 19th-century architecture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: 320,
            }}
          />
        </div>

        <div className="media-tile image-tile">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239650/pages/travel/cannes/images/june29-outdoor-gym.jpg"
            alt="Outdoor calisthenics park in the Po Valley – yellow-green pull-up bars and rings under a deep blue Italian sky"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: 320,
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          {
            href: '/reisen/cannes/tag-4',
            label: 'Previous: Day 4',
            ghost: true,
          },
          {
            href: '/reisen/cannes/zweite-alpenueberquerung',
            label: 'Next: Second Alpine Crossing',
          },
        ]}
      />
    </section>
  );
}
