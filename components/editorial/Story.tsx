import Link from 'next/link';

export function StoryHeader({ title, intro, meta, back = '/reisen', backLabel = 'Alle Reisen' }: { title: string; intro: string; meta?: string; back?: string; backLabel?: string }) {
  return (
    <header className="story-header wrap">
      <Link className="back-link" href={back}>← {backLabel}</Link>
      {meta && <p className="meta">{meta}</p>}
      <h1>{title}</h1><p className="lede">{intro}</p>
    </header>
  );
}

export function OpenQuestion({ children }: { children: React.ReactNode }) {
  return <aside className="open-question"><strong>Für die Erzählung noch offen</strong><p>{children}</p></aside>;
}

export function FallScene() {
  return (
    <section id="absprung" className="fall-scene dark" data-sc-act="pin" data-sc-span="2.8" data-sc-fall="" data-sc-verify-state="0:0.720">
      <div data-sc-stage>
        <div className="fall-heading"><p className="meta">Oahu · Hawaii 2025</p><h2 data-sc-cue="0 1 0 0">Ein Moment.<br /><em>Kein Boden.</em></h2><p>Der Fallschirmsprung.</p></div>
        <div className="fall-window"><div className="media-placeholder" role="img" aria-label="Videoplatzhalter für den Fallschirmsprung" data-placeholder="fall"><span className="placeholder-label"><span className="desktop-filename">hawaii-absprung.mp4</span><span className="mobile-filename">hawaii-absprung-mobil.mp4</span></span></div></div>
        <div className="fall-trace" aria-hidden="true"><div className="fall-line"><span /></div></div>
        <Link className="fall-link text-link" href="/reisen/hawaii/adventures">Zum Kapitel Unterwegs ↗</Link>
      </div>
    </section>
  );
}
