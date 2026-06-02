import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryHighlights } from '@/components/StoryHighlights';
import { StoryPagination } from '@/components/StoryPagination';
import { CannesRouteMap } from '@/components/CannesRouteMap';
import { Coverflow, type CoverflowSlide } from '@/components/sections/Coverflow';

export const metadata: Metadata = {
  title: 'Fahrradtour Konstanz → Cannes | Steven',
  description:
    'Cycling trip Konstanz to Cannes – the full story: motivation, the Rhine, two Alpine crossings, Italy and the arrival on the Côte d’Azur.',
};

// ——— Eingebettete Mini-Karussells je Etappe ————————————————————
// Wiederverwendung der bestehenden Coverflow-Komponente. Jede Etappe nutzt
// genau die Bilder, die zuvor auf ihrer eigenen Unterseite lagen.
const MOTIVATION_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237637/pages/travel/cannes/images/Fahrrad_Abschluss.jpg',
    alt: 'The Bike',
    caption: 'Das gebrauchte Tourenrad – treuer Begleiter über 900 km.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237639/pages/travel/cannes/images/1_Tour_Start.jpg',
    alt: 'The Gear',
    caption: 'Kilometer null – Start in Konstanz, Ziel: das Mittelmeer.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237641/pages/travel/cannes/images/Abschied_Biwakhu%CC%88tte.jpg',
    alt: 'Abschied Biwakhütte',
    caption: 'Abschied von der Biwakhütte – der Weg ruft.',
  },
];

const KONSTANZ_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237643/pages/travel/cannes/images/21062025_Bild_von_mir_.jpg',
    alt: 'Steven in cycling gear at the start of the tour – helmet, sunglasses and hydration vest on, train tracks visible in background',
    caption: 'Startklar am Bodensee – Helm auf, Weste gepackt.',
  },
];

const TAG1_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237647/pages/travel/cannes/images/2_Reto_.jpg',
    alt: 'A cold Wanda beer on a terrace table – mountains visible in the background after the first day of cycling',
    caption: 'Tag 1 geschafft – ein kühles Wanda-Bier auf der Terrasse.',
  },
];

const TAG2_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237649/pages/travel/cannes/images/View_wrong_way.jpg',
    alt: 'The Rhine Gorge near Chur – dramatic alpine landscape with forested rocky cliffs and a river far below under a vivid blue sky',
    caption: 'Die Rheinschlucht bei Chur – der „Swiss Grand Canyon“.',
  },
];

const TAG3_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239656/pages/travel/cannes/images/june24-alpine-pass.png',
    alt: 'Steven standing at the edge of an alpine road, back to the camera, looking at snow-capped mountain peaks – loaded bike with yellow rain cover visible beside him',
    caption: 'Der erste Alpenpass – jede Kurve hart erkämpft.',
  },
];

const TAG4_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239658/pages/travel/cannes/images/june25-lake-camping.png',
    alt: 'A lakeside campsite in northern Italy – turquoise lake surrounded by mountains, a bell tent and palm trees visible, cycling heart logo on the road',
    caption: 'Nachtlager am Bergsee – das beste Hotel der Welt.',
  },
];

const ITALIEN_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239644/pages/travel/cannes/images/june26-tent-morning.jpg',
    alt: 'Morning view from inside a bivouac tent – mesh fabric ceiling, blue sky and green trees visible, shoes at the foot end',
    caption: 'Morgens aus dem Zelt – und direkt weiter Richtung Süden.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239646/pages/travel/cannes/images/june27-pilgrim-cooking.jpg',
    alt: 'Steven in a floral apron making gnocchi from scratch in the pilgrim house kitchen – flour on the table, peace sign, huge smile',
    caption: 'Gnocchi von Hand – Pilgerhaus-Küche bei Mornago.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239648/pages/travel/cannes/images/june28-turin-gallery.png',
    alt: 'The grand covered arcade in Turin – black and white marble floors, ornate arched glass ceiling, iron lanterns, elegant 19th-century architecture',
    caption: 'Turin – Marmor, Glas und Eleganz unter den Arkaden.',
  },
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239650/pages/travel/cannes/images/june29-outdoor-gym.jpg',
    alt: 'Outdoor calisthenics park in the Po Valley – yellow-green pull-up bars and rings under a deep blue Italian sky',
    caption: 'Outdoor-Gym in der Po-Ebene – Beine brauchen Bewegung.',
  },
];

const ALPEN_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239660/pages/travel/cannes/images/june30-alpine-lake.jpg',
    alt: 'Steven laughing with eyes closed at a high-altitude mountain lake in the Maritime Alps – helmet and rain jacket on, emerald green lake and jagged rocky peaks behind him',
    caption: 'Zweite Alpenüberquerung – Wasser klar wie Glas.',
  },
];

const ANKUNFT_SLIDES: CoverflowSlide[] = [
  {
    src: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1774239653/pages/travel/cannes/images/july01-arrival-bike.jpg',
    alt: 'The Vermont touring bike loaded with gear, parked against a tree in a Lidl parking lot in southern France – helmet hanging off the handlebars, green mountains visible in the background',
    caption: 'Ankunft in Südfrankreich – Salzluft, Wiedersehen, geschafft.',
  },
];

export default function CannesStory() {
  return (
    <section className="story-detail" aria-labelledby="story-title">
      <Breadcrumb href="/#travel" label="← Back to travel overview" />

      <StoryDetailHeader
        kicker="Cycling Tour Konstanz → Cannes"
        titleId="story-title"
        title="Fahrradtour Konstanz → Cannes"
        meta="21. Juni – 1. Juli 2025 · ~900 km · 4 Länder"
        summary="No job. A cheap tent. A bike I had never ridden long-distance. That was all I needed. One flowing story — from Lake Constance over the Alps to the Côte d’Azur. Sometimes the best ideas are the ones you don’t overthink."
      />

      <div className="story-content">
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

      {/* ——— Motivation ——————————————————————————————————————— */}
      <article id="motivation" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Motivation</h2>
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
        </div>
        <div className="story-carousel">
          <Coverflow slides={MOTIVATION_SLIDES} label="Motivation" />
        </div>
      </article>

      {/* ——— Startpunkt Konstanz ——————————————————————————————— */}
      <article id="startpunkt-konstanz" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Starting Point Konstanz</h2>
          <p className="story-meta">June 21, 2025 · Day 0</p>
          <p>
            Getting to Konstanz by train with a fully loaded touring bike is an
            adventure in itself. Navigating through the carriages, squeezing past
            doors, making sure nothing toppled — by the time I arrived at the
            station I was already sweating, and I hadn’t turned a single pedal
            yet.
          </p>
          <p>
            Konstanz sits right on the shore of Lake Constance (
            <em>Bodensee</em>), at the southernmost tip of Germany. Standing
            there, looking south toward Switzerland, everything became suddenly
            very real. The hydration vest was loaded, the panniers were packed,
            the helmet was on. No plan beyond “go south, cross the mountains,
            reach France.”
          </p>
          <p>
            I took a moment to breathe it in — the smell of the lake, the warm
            June air, the buzz of summer. Then I clipped in, pointed the wheels
            south, and started pedalling. That first kilometre felt like a
            thousand promises.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={KONSTANZ_SLIDES} label="Startpunkt Konstanz" />
        </div>
      </article>

      {/* ——— Tag 1 ————————————————————————————————————————————— */}
      <article id="tag-1" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Day 1 — First Night on the Road</h2>
          <p className="story-meta">June 22, 2025 · Rhine Cycling Path</p>
          <p>
            Day one began with a healthy mix of excitement and mild chaos. The
            route along the Rhine was flat and straightforward — the kind of
            riding that lets your mind wander while your legs fall into rhythm.
            Fields, trees, the river beside me. It felt easy. Too easy, part of
            me thought.
          </p>
          <p>
            The kilometres passed. The Rhine valley opened up, wide and green
            under a grey sky that couldn’t quite decide whether it wanted to
            rain. By mid-afternoon I’d already covered more ground than expected,
            and the legs were talking but not complaining.
          </p>
          <p>
            What I didn’t expect was how quickly strangers would become part of
            the story. Sitting down to rest at a terrace, a cold drink in hand,
            watching the mountains start to define the horizon — that moment of
            stopping and just being somewhere new with everything you own on a
            bicycle beside you. That’s a specific kind of freedom. A cold Wanda
            beer and the sound of the outdoors. Day one, done.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={TAG1_SLIDES} label="Tag 1" />
        </div>
      </article>

      {/* ——— Tag 2 ————————————————————————————————————————————— */}
      <article id="tag-2" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Day 2 — Along the Rhine to Chur</h2>
          <p className="story-meta">
            June 23, 2025 · Rhine Valley → Chur, Switzerland
          </p>
          <p>
            Day two was about finding a rhythm. The Rhine Gorge — sometimes
            called the “Swiss Grand Canyon” — opened up somewhere south of Chur,
            and nothing could have prepared me for the scale of it. Rocky walls
            dropping hundreds of metres, dense forest clinging to the slopes,
            and a turquoise river threading through the valley far below. I
            stopped at a viewpoint and just stared for a while.
          </p>
          <p>
            The riding itself was a long, steady push — not brutal, but
            consistent. Switzerland’s road infrastructure is almost unfairly good
            for cycling: smooth tarmac, clear signage, and mountain air cool
            enough to make the effort feel manageable even under a blazing June
            sky.
          </p>
          <p>
            The highlight of the day came not from the landscape but from a
            retiree near Chur. We got talking, and he invited me to pitch my
            tent in his garden for the night. Before I left the next morning, he
            pressed some cash into my hand — for camping fees ahead, he said. I
            hadn’t asked. He just did it. Some moments on a long journey stay
            with you permanently. This was one of them.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={TAG2_SLIDES} label="Tag 2" />
        </div>
      </article>

      {/* ——— Tag 3 ————————————————————————————————————————————— */}
      <article id="tag-3" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Day 3 — Into the Alps</h2>
          <p className="story-meta">
            June 24, 2025 · Swiss Alps · Splügen Pass area
          </p>
          <p>
            Day three was the day things got real. A wrong turn — or rather, a
            routing decision that seemed logical on the map but wasn’t — added
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
            alive — that’s the image I carry from this day. The mountains don’t
            care about your plans. You adjust. You climb.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={TAG3_SLIDES} label="Tag 3" />
        </div>
      </article>

      {/* ——— Tag 4 ————————————————————————————————————————————— */}
      <article id="tag-4" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Day 4 — Switzerland Done, Italy Begins</h2>
          <p className="story-meta">June 25, 2025 · Alps → Northern Italy</p>
          <p>
            Crossing into Italy felt monumental. Switzerland had been stunningly
            beautiful but also relentlessly demanding — the climbs, the
            altitude, the sheer scale of everything. Coming down the other side
            of the Alps, the air got warmer, the road signs switched language,
            and something shifted in the atmosphere. Europe feels different
            country by country, and Italy announces itself immediately.
          </p>
          <p>
            The descent brought me to a lake campsite unlike anything I’d
            expected to find in northern Italy — turquoise water, palm trees, a
            cycling path running right past the entrance. The kind of place
            you’d normally book months in advance. I just rolled in, pitched the
            tent, and sat by the water for a long time.
          </p>
          <p>
            Later that evening, circumstances and budget meant improvising a
            sleeping spot under a railway bridge. It sounds worse than it was.
            Dry, sheltered, and with a certain rough poetry to it — the kind of
            accommodation you only get when you’re moving through the world
            without a fixed plan. That’s where day four ended: under Italian
            stars, listening to the odd train pass overhead.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={TAG4_SLIDES} label="Tag 4" />
        </div>
      </article>

      {/* ——— Abschnitt Italien ————————————————————————————————— */}
      <article id="abschnitt-italien" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Italy — Heat, Pasta &amp; Turin</h2>
          <p className="story-meta">
            June 26–29, 2025 · Northern Italy · Turin · Cuneo
          </p>
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
            became the scene of one of the trip’s best memories: making gnocchi
            from scratch with other guests, flour everywhere, someone’s Italian
            grandmother’s recipe, laughing over a chopping board. Travel does
            this — it creates moments you couldn’t have planned.
          </p>
          <p>
            Turin was a full day off the bike and worth every minute. The city’s
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
        </div>
        <div className="story-carousel">
          <Coverflow slides={ITALIEN_SLIDES} label="Abschnitt Italien" />
        </div>
      </article>

      {/* ——— Zweite Alpenüberquerung ——————————————————————————— */}
      <article id="zweite-alpenueberquerung" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Second Alpine Crossing — 2,700 m</h2>
          <p className="story-meta">
            June 30, 2025 · Maritime Alps · Italy → France
          </p>
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
        </div>
        <div className="story-carousel">
          <Coverflow
            slides={ALPEN_SLIDES}
            label="Zweite Alpenüberquerung"
          />
        </div>
      </article>

      {/* ——— Ankunft Südfrankreich ————————————————————————————— */}
      <article id="ankunft-suedfrankreich" className="story-stage">
        <div className="story-content">
          <h2 className="story-h2">Arrival — Southern France</h2>
          <p className="story-meta">July 1, 2025 · Côte d’Azur · Cannes</p>
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
            The Côte d’Azur hit differently after ten days on a bicycle. Nice
            felt enormous. The <em>Promenade des Anglais</em> was everything
            you’ve seen in photographs, and somehow still surprising in person.
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
            Green mountains still visible in the background, unimpressed. That’s
            the photo. That’s the finish line. No fanfare, no ceremony — just a
            bike that made it, and a person who made it too.
          </p>
        </div>
        <div className="story-carousel">
          <Coverflow slides={ANKUNFT_SLIDES} label="Ankunft Südfrankreich" />
        </div>
      </article>

      <StoryPagination
        ariaLabel="Chapter navigation"
        actions={[{ href: '/#travel', label: 'Back to Travel Overview', ghost: true }]}
      />
    </section>
  );
}
