import { SectionHead } from '@/components/SectionHead';

export function Projects() {
  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <SectionHead
        kicker="Projekte"
        titleId="projects-title"
        title="Was als Nächstes kommt."
        intro="Hier entsteht später die Projektgalerie. Aktuell geplant: DHBW Webseite"
      />
      <div className="section-body">
        <article className="card">
          <h3>DHBW Events &amp; Standort Website</h3>
          <p>
            Konzept für eine Informationsseite zu Events und Standorten an der
            DHBW Mosbach Campus Bad MGH.
          </p>
        </article>
      </div>
    </section>
  );
}
