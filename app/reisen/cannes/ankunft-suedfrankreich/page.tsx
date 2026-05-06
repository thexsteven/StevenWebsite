import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Cannes · Arrival in Southern France | Steven',
  description:
    'Cycling trip Konstanz to Cannes – Arrival in Southern France: the finish, the bike, the Lidl parking lot.',
};

export default function CannesAnkunftSuedfrankreich() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Arrival — Southern France"
        meta="July 1, 2025 · Côte d'Azur · Cannes"
        summary="After 10 days and roughly 900 km, the bike came to a stop in a Lidl parking lot somewhere near Cannes. Helmet off the handlebars. Chips on the rack. Mountains behind. Done."
      />

      <div className="story-content">
        <p>
          The descent from the Maritime Alps into southern France was the best
          30 kilometres of the entire trip. Everything that had been hard and
          heavy on the way up — the weight, the altitude, the loose rock —
          turned into pure momentum going down. The air got warmer with every
          metre lost. The vegetation shifted: pine trees, then Mediterranean
          scrub, then the first palm trees appearing alongside the road. The
          sea was somewhere ahead.
        </p>
        <p>
          The Côte d'Azur hit differently after ten days on a bicycle. Nice
          felt enormous. The <em>Promenade des Anglais</em> was everything
          you've seen in photographs, and somehow still surprising in person.
          I sat on the beach for a while with the bike lying beside me in the
          sand and tried to process the fact that I had cycled here from Lake
          Constance.
        </p>
        <p>
          The final stretch from Nice to Cannes runs along the coast — sun,
          traffic, blue water, the kind of scenery that cyclists post on
          social media. I barely noticed it. The legs had stopped sending
          updates somewhere around kilometre 850 and I was running entirely on
          momentum and the knowledge that a friend was waiting at the end.
        </p>
        <p>
          And then — a Lidl parking lot, somewhere in the south of France. A
          Vermont touring bike leaning against a tree. A helmet hanging off
          the handlebars. A bag of chips on the rear rack because priorities.
          Green mountains still visible in the background, unimpressed. That's
          the photo. That's the finish line. No fanfare, no ceremony — just a
          bike that made it, and a person who made it too.
        </p>

        <StoryHighlights
          items={[
            { label: 'Date', value: 'July 1, 2025' },
            { label: 'Final destination', value: 'Cannes, France 🇫🇷' },
            { label: 'Total distance', value: '~900 km' },
            { label: 'Duration', value: '10 days · 4 countries' },
            { label: 'The bike', value: 'Vermont touring · Still intact' },
            { label: 'Prior experience', value: 'None' },
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
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239653/pages/travel/cannes/images/july01-arrival-bike.jpg"
            alt="The Vermont touring bike loaded with gear, parked against a tree in a Lidl parking lot in southern France – helmet hanging off the handlebars, green mountains visible in the background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxHeight: 680,
            }}
          />
        </div>
      </div>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[
          {
            href: '/reisen/cannes/zweite-alpenueberquerung',
            label: 'Previous: Second Alpine Crossing',
            ghost: true,
          },
          { href: '/#travel', label: 'Back to Travel Overview' },
        ]}
      />
    </section>
  );
}
