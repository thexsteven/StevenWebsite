import type { Metadata } from 'next';
import Link from 'next/link';

const imageBase = 'https://res.cloudinary.com/dozdjb4fi/image/upload';
const videoBase = 'https://res.cloudinary.com/dozdjb4fi/video/upload';

type VeniceImageProps = {
  publicId: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

function VeniceImage({ publicId, alt, caption, width, height, className = '', priority = false }: VeniceImageProps) {
  const sources = [480, 720, 960, 1280, 1920]
    .map((size) => `${imageBase}/f_auto,q_auto,w_${size}/${publicId} ${size}w`)
    .join(', ');

  return (
    <figure className={`venice-photo ${className}`}>
      {/* Cloudinary provides the responsive transforms and source set. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${imageBase}/f_auto,q_auto,w_1280/${publicId}`}
        srcSet={sources}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 620px"
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const heroImage = `${imageBase}/f_auto,q_auto,c_fill,w_1200,h_630/IMG_0263_tfr9le`;

export const metadata: Metadata = {
  title: 'Venedig mit dem Wohnmobil',
  description: 'Ein langes Wochenende von München über die Dolomiten nach Venedig: kalte Nächte, italienisches Essen, Kanäle und ein Abend am Piano.',
  openGraph: {
    title: 'Venedig mit dem Wohnmobil · Steven Braun',
    description: 'Von München durch die Dolomiten bis in die Lagunenstadt.',
    images: [{ url: heroImage, width: 1200, height: 630 }],
  },
};

export default function Venedig() {
  return (
    <article className="venice-story">
      <header className="venice-hero">
        <div className="venice-hero-copy">
          <Link className="back-link" href="/reisen">← Alle Reisen</Link>
          <p className="meta">München · Dolomiten · Venedig</p>
          <h1>Venedig.<br /><em>Auf Umwegen.</em></h1>
          <p className="lede">Ein langes Wochenende zu dritt im Wohnmobil. Erst minus zwei Grad in den Dolomiten, später fast dreißig Grad zwischen Kanälen, Kirchen und Bars.</p>
        </div>
        <VeniceImage
          publicId="IMG_0263_tfr9le"
          alt="Steven und seine Freunde sitzen mit ihrem einheimischen Begleiter in einer venezianischen Bar"
          caption="Unterwegs mit einem Einheimischen durch Venedig"
          width={5712}
          height={4284}
          className="venice-hero-photo"
          priority
        />
        <div className="venice-poles" aria-hidden="true"><span /><span /></div>
      </header>

      <nav className="venice-route" aria-label="Stationen der Venedig-Reise">
        <a href="#aufbruch"><span>01</span> Aufbruch</a>
        <a href="#dolomiten"><span>02</span> Dolomiten</a>
        <a href="#venedig"><span>03</span> Venedig</a>
        <a href="#nacht"><span>04</span> Die Nacht</a>
      </nav>

      <section id="aufbruch" className="venice-chapter venice-chapter-intro">
        <div className="venice-copy">
          <p className="meta">München</p>
          <h2>Drei Freunde.<br />Ein Wohnmobil.</h2>
          <p>Alex, Javier und ich planten einen langen Wochenendtrip von München nach Venedig und zurück. Wir lebten zu dieser Zeit gemeinsam in Bad Mergentheim. Alex und ich studierten dual Angewandte Informatik, Javier stand vor seinem Studienkolleg-Abschluss.</p>
          <p>In München holten wir das Wohnmobil ab. Es wurde für die nächsten Tage unser Fahrzeug, unsere Küche und unser Schlafzimmer.</p>
        </div>
        <div className="venice-pair">
          <VeniceImage publicId="198EE6A0-D482-4F7F-9139-5F03484B60FC_ectt8h" alt="Die Reisegruppe bei der Abholung des Wohnmobils in München" caption="Abfahrt in München" width={2062} height={3664} />
          <VeniceImage publicId="6165B733-5914-49D6-AB39-98DC36C4CDEC_m9cio4" alt="Blick in den Innenraum des Wohnmobils während der ersten Nacht" caption="Für ein Wochenende unser Zuhause" width={2160} height={3840} />
        </div>
      </section>

      <section id="dolomiten" className="venice-mountain dark">
        <div className="venice-mountain-copy">
          <p className="meta">Erste Nacht · Dolomiten</p>
          <h2>Minus zwei.<br />Keine Heizung.</h2>
          <p>Die erste Nacht verbrachten wir in den Dolomiten. Draußen waren es minus zwei Grad, im Wohnmobil funktionierte die Heizung nicht. Am nächsten Morgen lag vor uns eine Landschaft, die den kalten Schlafplatz fast vergessen ließ.</p>
        </div>
        <div className="venice-mountain-gallery">
          <VeniceImage publicId="IMG_0126_vjblf5" alt="Mondbeschienener Bergkamm in den Dolomiten bei Nacht" caption="Die Dolomiten bei Nacht" width={3021} height={1776} className="venice-wide" />
          <VeniceImage publicId="IMG_0131_oyfidn" alt="Ein besonderes Gebäude in der kalten Berglandschaft der Dolomiten" caption="Ein rätselhafter Bau in der Kälte" width={5712} height={4284} />
          <VeniceImage publicId="IMG_0149_j9lde2" alt="Fußballplatz vor einer hohen Bergkulisse" caption="Ein Fußballplatz zwischen den Bergen" width={4284} height={5712} />
        </div>
      </section>

      <section className="venice-passage" aria-label="Weiterfahrt nach Venedig">
        <VeniceImage publicId="IMG_0100_jj9hjj" alt="Erster Restaurantbesuch in Italien nach der Fahrt über die Grenze" caption="Die erste Pizza in Italien, im Bellavita in Sterzing" width={3024} height={4032} />
        <div className="venice-passage-copy">
          <p className="meta">Sterzing · Italien</p>
          <h2>Von der Kälte<br />in den Süden.</h2>
          <p>Kurz hinter der Grenze suchten wir nach einem italienischen Restaurant und fanden das Bellavita in Sterzing. Nach der Nacht in den Bergen fühlte sich diese Pizza wie der eigentliche Beginn Italiens an.</p>
        </div>
        <VeniceImage publicId="IMG_0155_nqf3n4" alt="Pause an einem See auf der italienischen Seite der Alpen" caption="Eine kurze Pause am See" width={4284} height={5712} />
      </section>

      <section id="venedig" className="venice-city">
        <div className="venice-city-title">
          <p className="meta">Venezia</p>
          <h2>Die Straße<br />wird zum Kanal.</h2>
          <p>Vor dem Bahnhof standen wir zum ersten Mal gemeinsam in Venedig. Von dort ging es zu Fuß und mit dem Boot weiter, vorbei an alten Fassaden und durch Kirchen, deren Räume noch größer wirkten als ihre schmalen Eingänge.</p>
        </div>
        <div className="venice-city-grid">
          <VeniceImage publicId="IMG_0188_jbghpe" alt="Alex, Javier und Steven bei ihrer Ankunft vor dem Bahnhof in Venedig" caption="Ankunft in Venedig" width={4284} height={5712} className="venice-arch" />
          <VeniceImage publicId="IMG_0193_xru0gq" alt="Alte Fassaden an einer Gasse in Venedig" caption="Zwischen den alten Häusern" width={3024} height={4032} />
          <VeniceImage publicId="IMG_0194_hvosrd" alt="Innenraum einer alten katholischen Kirche in Venedig" caption="Kirchen, Kunst und kühler Stein" width={4284} height={5712} />
          <VeniceImage publicId="IMG_0240_kqp8hj" alt="Klassischer Blick auf einen venezianischen Kanal" caption="Venedig, wie man es sich vorstellt" width={3024} height={4032} className="venice-arch" />
        </div>
        <div className="venice-local">
          <div>
            <p className="meta">Mit Graziano</p>
            <h3>Die Stadt durch seine Augen.</h3>
            <p>Graziano, ein früherer Arbeitskollege aus Venedig, zeigte uns seine Stadt und erzählte von ihrer Geschichte. Zu der klassischen Tour gehörten Prosecco und kleine belegte Brote. Das Taxi war hier meistens ein Schiff.</p>
          </div>
          <VeniceImage publicId="IMG_0276_juro0b" alt="Fahrt mit einem Boot durch Venedig" caption="In Venedig kommt das Taxi über das Wasser" width={4284} height={5712} />
        </div>
      </section>

      <section id="nacht" className="venice-night dark">
        <div className="venice-night-copy">
          <p className="meta">Später Abend</p>
          <h2>Und plötzlich<br />stand da ein Piano.</h2>
          <p>In einer Bar setzte ich mich ans Klavier und spielte einen Song. Aus dem geplanten Wochenendtrip wurde spätestens hier eine dieser Reisen, die später vor allem aus ihren ungeplanten Szenen bestehen.</p>
        </div>
        <figure className="venice-video">
          <video controls preload="metadata" poster={`${videoBase}/f_auto,q_auto,so_1,w_960/c5f4c9a2-f396-4f8f-aeaa-5e23d8b3d46e_smm1rn.jpg`} aria-label="Steven spielt in einer Bar in Venedig Piano">
            <source src={`${videoBase}/f_auto,q_auto/c5f4c9a2-f396-4f8f-aeaa-5e23d8b3d46e_smm1rn.mp4`} type="video/mp4" />
          </video>
          <figcaption>Piano in einer Bar in Venedig</figcaption>
        </figure>
        <div className="venice-night-photos">
          <VeniceImage publicId="IMG_0295_ycz0ko" alt="Die Reisegruppe trifft einen Freund aus einem früheren Auslandssemester" caption="Ein neues Gesicht, sofort Teil der Gruppe" width={3024} height={4032} />
          <VeniceImage publicId="IMG_0292_banljf" alt="Zwei Frauen und ein Mann stehen nachts auf einem Platz in Venedig" caption="Eine Begegnung spät in der Nacht" width={3024} height={4032} />
        </div>
      </section>

      <section className="venice-finale">
        <div>
          <p className="meta">Rückfahrt</p>
          <h2>Ein letzter Tisch.<br />Dann wieder Straße.</h2>
          <p>Bevor Davide am Bahnhof zurück nach Mailand fuhr, aßen wir noch einmal gemeinsam. Danach blieb das Wohnmobil für die Heimfahrt und eine Reise, die in wenigen Tagen erstaunlich viele Temperaturen, Orte und neue Menschen zusammengebracht hatte.</p>
          <Link className="text-link" href="/reisen">Zurück zu allen Reisen ↗</Link>
        </div>
        <VeniceImage publicId="2E1E2269-F86B-4784-999A-250DEB66AB41_fbwesm" alt="Die Gruppe sitzt vor der Abreise gemeinsam bei einer letzten Mahlzeit" caption="Die letzte Mahlzeit zusammen" width={2062} height={3664} className="venice-arch" />
      </section>
    </article>
  );
}
