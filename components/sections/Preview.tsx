export function Preview() {
  return (
    <section className="preview" aria-label="Vorschau der Inhalte">
      <h2>Areas of life</h2>
      <p className="section-intro">
        Ein schneller Überblick über die wichtigsten Bereiche meiner Website.
      </p>
      <div className="preview-grid">
        <a className="preview-card" href="#travel">
          <h3>Reisen</h3>
          <p>Fahrradabenteuer, Natur und Dokumentationen.</p>
        </a>
        <a className="preview-card" href="#sport">
          <h3>Sport</h3>
          <p>Motivation, Disziplin und dynamische Inhalte.</p>
        </a>
        <a className="preview-card" href="#resume">
          <h3>Lebenslauf</h3>
          <p>Meine Stationen, klar und seriös.</p>
        </a>
        <a className="preview-card" href="#projects">
          <h3>Projekte</h3>
          <p>Aktuelle Ideen und bald mehr Details.</p>
        </a>
      </div>
    </section>
  );
}
