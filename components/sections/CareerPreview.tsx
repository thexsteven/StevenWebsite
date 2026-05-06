import { SectionHead } from '@/components/SectionHead';

export function CareerPreview() {
  return (
    <section id="career" className="career" aria-labelledby="career-title">
      <SectionHead
        kicker="Karriere"
        titleId="career-title"
        title="Theorie trifft Praxis."
        intro="Ein Blick in meine Praxisphasen, Projekte und Semester-Insights."
      />
      <div className="section-body grid-2">
        <article className="card">
          <h3>Theoriephasen</h3>
          <p>
            Module, Lernstoff und Reflexionen pro Semester – mit
            Notion-Tiefenzugang für alle, die wirklich eintauchen wollen.
          </p>
          <a className="text-link" href="/karriere">
            Alle Semester ansehen
          </a>
        </article>
        <article className="card">
          <h3>Praxisphase · 1. Projektarbeit</h3>
          <p>Mitarbeit an Weblösungen, Requirements-Analyse und Testing.</p>
          <a className="text-link" href="/karriere/praxis-1">
            Praxis-Insights
          </a>
        </article>
      </div>
    </section>
  );
}
