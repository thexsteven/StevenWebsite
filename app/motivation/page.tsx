import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { characters } from '@/lib/characters';

export const metadata: Metadata = {
  title: 'Motivation | Steven',
  description:
    'Was mich wirklich antreibt — ehrlich, direkt, mit den Anime-Charakteren, die meine Geschichte besser erzählen als ich es selbst könnte.',
};

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
