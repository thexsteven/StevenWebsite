import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Motivation | Steven',
  description:
    'Was mich wirklich antreibt — ehrlich, direkt, mit den Anime-Charakteren, die meine Geschichte besser erzählen als ich es selbst könnte.',
};

const characters = [
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    quotes: [
      "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!",
      'Hard work is worthless for those that don\'t believe in themselves.',
    ],
    text: 'Naruto ist nicht mein Held, weil er der Stärkste ist. Er ist mein Held, weil er der Unwahrscheinlichste ist. Der Junge, dem alle sagten, dass er nichts wird — und der trotzdem alles wurde. Ich kenne dieses Gefühl. Den Blick von anderen, der fragt: „Warum erst Mechaniker, dann Techniker, dann nochmal Studium?" Naruto hat mich gelehrt, dass der Weg nicht gerade sein muss, um richtig zu sein. Und dass echte Stärke nicht aus Talent kommt, sondern aus dem Willen, aufzustehen — immer wieder.',
    imageAlt: 'Naruto Uzumaki in Sage Mode',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778107286/naruto-uzumaki-3840x2160-25435_wetnru.jpg',
  },
  {
    id: 'itachi',
    name: 'Itachi Uchiha',
    series: 'Naruto',
    quotes: [
      "People's lives don't end when they die. It ends when they lose faith.",
      'Growth occurs when one goes beyond one\'s limits. Realizing that is also part of training.',
    ],
    text: 'Itachi spricht nicht laut. Aber wenn er spricht, trifft es. Er hat mir beigebracht, dass die stillsten Menschen oft die tiefsten Kämpfe führen. Wer ihn nur als Antagonisten sieht, hat die Geschichte nicht verstanden. Itachi hat alles gegeben — ohne je Anerkennung zu verlangen. Diese ruhige, konsequente Form von Stärke, ohne Drama, ohne Erklärungen, ist etwas, nach dem ich strebe. Nicht immer laut sein. Aber immer klar wissen, warum man handelt.',
    imageAlt: 'Itachi Uchiha im ruhigen Moment',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778107287/itachi-uchiha-sharingan-3840x2160-15325_nobtir.png',
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    quotes: [
      "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!",
      "If you don't take risks, you can't create a future!",
    ],
    text: 'Luffy versteht Freiheit auf eine Weise, die kein Erwachsener mehr versteht. Er will nicht regieren — er will frei sein. Und er kämpft nicht für Ruhm, sondern für seine Crew, für die Menschen, die er liebt. Das ist es, was mich an ihm bewegt. Ich möchte nicht der Reichste oder Berühmteste sein. Ich möchte frei sein. Ich möchte mit den Menschen leben, die mir wichtig sind. Und ich möchte, dass das, was ich baue, diesen Weg trägt.',
    imageAlt: 'Monkey D. Luffy lachend mit Strohhut',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778107286/monkey-d-luffy-3840x2160-26035_suho2r.jpg',
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    series: 'One Piece',
    quotes: [
      'When I decided to follow my dream, I had already discarded my life.',
      "I don't care what the society says. I've regretted nothing in my life. The flow of time is cruel, you can't go back to the past.",
    ],
    text: 'Zoro redet nicht viel. Er trainiert. Er schläft. Er kämpft. Und er schläft wieder. Es gibt keine Ausreden, keine Ablenkungen — nur das Ziel. Dieses Bild lässt mich nicht los. In einer Welt voller Lärm ist Zoros stille Disziplin fast schon revolutionär. Er hat mich gelehrt, dass echte Konsequenz keine tägliche Motivation braucht. Wer wirklich will, braucht kein Warum für jeden einzelnen Tag — er steht einfach auf und macht.',
    imageAlt: 'Roronoa Zoro mit drei Schwertern',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778107286/roronoa-zoro-katana-3840x2160-10544_jp48ok.jpg',
  },
  {
    id: 'jiraiya',
    name: 'Jiraiya',
    series: 'Naruto',
    quotes: [
      'A place where someone still thinks about you is a place you can call home.',
      'A dropout will beat a genius through hard work.',
    ],
    text: 'Jiraiya ist der Charakter, der mir am meisten weh tut. Nicht weil er stark war — sondern weil er menschlich war. Er hat Fehler gemacht, große Fehler. Er hat geliebt und verloren. Er hat trotzdem weitergeglaubt — an seine Schüler, an die nächste Generation, an das Gute in der Welt. Ich denke an Jiraiya, wenn das Leben schwer ist. Wenn ich nicht weiß, ob es sich lohnt. Und dann ist da dieser Satz über Zuhause. Nicht ein Ort. Sondern ein Gefühl. Menschen, die an dich denken. Das ist alles, was zählt.',
    imageAlt: 'Jiraiya lächelnd beim Schreiben',
    imageSrc: 'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778107286/naruto-uzumaki-minato-namikaze-black-background-amoled-5k-8k-3840x2160-8096_j6b1gu.jpg',
  },
];

export default function MotivationPage() {
  return (
    <>
      <SiteHeader variant="motivation" />
      <main id="main">
      <section className="motivation-page" aria-labelledby="motivation-title">
      <div className="motivation-hero">
        <Link href="/#about" className="breadcrumb">
          ← Zurück zur Startseite
        </Link>
        <span className="section-kicker">Was mich antreibt</span>
        <h1 id="motivation-title">Motivation.</h1>
        <p className="motivation-intro">
          Diese Seite ist kein Motivationsvortrag. Kein LinkedIn-Post, den ich
          mir schöngeschrieben habe. Hier geht es darum, was mich wirklich
          antreibt — ehrlich, direkt, und ja: mit ein paar Anime-Charakteren,
          die meine Geschichte besser erzählen, als ich es selbst könnte. Wer
          sich hier wiederfindet, der versteht mich.
        </p>
      </div>

      <div className="motivation-characters">
        {characters.map((char, i) => (
          <article
            key={char.id}
            className={`character-section${i % 2 === 1 ? ' character-section--reverse' : ''}`}
            id={char.id}
          >
            <div className="character-quotes">
              {char.quotes.map((quote, i) => (
                <div key={i} className="quote-image-card">
                  {char.imageSrc ? (
                    <img src={char.imageSrc} alt={char.imageAlt} />
                  ) : (
                    <div className="quote-image-placeholder" aria-hidden="true">
                      <span>{char.name}</span>
                    </div>
                  )}
                  <div className="quote-overlay">
                    <blockquote>&ldquo;{quote}&rdquo;</blockquote>
                    <cite>— {char.name}</cite>
                  </div>
                </div>
              ))}
            </div>
            <div className="character-text">
              <div className="character-meta">
                <span className="character-series">{char.series}</span>
                <h2>{char.name}</h2>
              </div>
              <p>{char.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
    </main>
    <SiteFooter />
    </>
  );
}
