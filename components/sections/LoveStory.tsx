import { SectionHead } from '@/components/SectionHead';

const chapters = [
  {
    href: '/liebe/prolog',
    meta: 'Prolog',
    title: 'Der Startschuss',
    date: '2015',
    preview:
      'Wie alles anfing – auf einem Asphaltplatz in Preußisch Oldendorf, mit einem Schuss voll in dein Gesicht.',
  },
  {
    href: '/liebe/kapitel-01',
    meta: 'Kapitel 01',
    title: 'Wie wir uns kennengelernt haben',
    date: '2013 · 2017',
    preview:
      'Realschule Lahde, gegenseitiges Nerven, ein Wegzug – und zwei Jahre später ein Moment, der sich plötzlich nicht mehr falsch anfühlte.',
  },
  {
    href: '/liebe/kapitel-02',
    meta: 'Kapitel 02',
    title: 'Die ersten Abenteuer',
    date: '2017 · 2018',
    preview:
      'Kroatien per Snapchat, Pommes auf dem Boden vor dem Grilli Willi und Yamaha-Fahrten ohne Plan – die Phase, in der ohne große Worte etwas zwischen uns wuchs.',
  },
  {
    href: '/liebe/kapitel-03',
    meta: 'Kapitel 03',
    title: 'Was uns zusammenhält',
    date: '2019 · 2023',
    preview:
      'Winterball, ein Ja im Regen, Trennungen, Wiedersehen und eine lange Stille – und das, was sie aus uns gemacht hat.',
  },
  {
    href: '/liebe/kapitel-04',
    meta: 'Kapitel 04',
    title: 'Unsere schönsten Momente',
    date: '24. Januar 2026',
    preview:
      'Eine Nachricht im Januar 2026. Bad Mergentheim, ein bewusst verschobener Kuss beim Wartturm.',
  },
  {
    href: '/liebe/epilog',
    meta: 'Epilog',
    title: 'Für dich',
    date: '2026',
    preview: 'Drei Sätze, die ich nicht laut sagen kann – aber aufschreiben.',
  },
];

export function LoveStory() {
  return (
    <section
      id="love-story"
      className="love-story"
      aria-hidden="true"
      aria-labelledby="love-story-title"
    >
      <SectionHead
        kicker="Privat · Nur für uns"
        kickerClassName="love-kicker"
        titleId="love-story-title"
        title="Unsere Geschichte"
        intro="Alles hat seinen Anfang. Hier ist unserer."
      />
      <div className="love-chapters">
        {chapters.map((c) => (
          <a key={c.href} className="love-chapter" href={c.href}>
            <span className="love-chapter-meta">{c.meta}</span>
            <h3 className="love-chapter-title">{c.title}</h3>
            <p className="love-chapter-date">{c.date}</p>
            <p className="love-chapter-preview">{c.preview}</p>
            <span className="love-chapter-cta">Lesen →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
