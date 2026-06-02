import Image from 'next/image';

type HawaiiStoryHeroProps = {
  /** Slug der Sub-Seite – wählt /images/hawaii/hero-<slug>.png. */
  slug: string;
  /** Augenbrauen-Text über dem Titel, z. B. "Hawaii Sprachreise". */
  eyebrow: string;
  /** Sichtbarer Titel der Seite. */
  title: string;
  /** id der <h1>, für aria-labelledby der Story-Section. */
  titleId: string;
  /**
   * Realer Ort, der illustriert wird. Fließt in den Alt-Text ein, der klar
   * sagt, dass es sich um eine ILLUSTRATION handelt.
   */
  place: string;
  /** Datum / Ort als Meta-Zeile, z. B. "März – April 2025 · Oahu". */
  meta?: string;
  /** Optionaler Lead-Text, der unter dem Hero erscheint. */
  summary?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

/**
 * Wiederverwendbarer Hero für die Hawaii-Sub-Seiten: eine generierte
 * Illustration als Hintergrund, darüber ein Lesbarkeits-Verlauf (dunkel von
 * unten) und der Seitentitel mit Augenbraue, Meta und Zurück-Link.
 */
export function HawaiiStoryHero({
  slug,
  eyebrow,
  title,
  titleId,
  place,
  meta,
  summary,
  backHref = '/#travel',
  backLabel = '← Zurück zur Reise‑Übersicht',
}: HawaiiStoryHeroProps) {
  return (
    <>
      <header className="hawaii-hero">
        <div className="hawaii-hero-media">
          <Image
            src={`/images/hawaii/hero-${slug}.png`}
            alt={`Illustration von ${place}`}
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="hawaii-hero-scrim" aria-hidden="true" />
        <div className="hawaii-hero-inner">
          <a className="hawaii-hero-back" href={backHref}>
            {backLabel}
          </a>
          <div className="hawaii-hero-text">
            <p className="hawaii-hero-eyebrow">{eyebrow}</p>
            <h1 id={titleId} className="hawaii-hero-title">
              {title}
            </h1>
            {meta && <p className="hawaii-hero-meta">{meta}</p>}
          </div>
        </div>
      </header>
      {summary && (
        <div className="hawaii-hero-lead">
          <p>{summary}</p>
        </div>
      )}
    </>
  );
}
