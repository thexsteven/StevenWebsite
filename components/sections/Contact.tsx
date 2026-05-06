import { SectionHead } from '@/components/SectionHead';

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <SectionHead
        kicker="Kontakt"
        titleId="contact-title"
        title="Let's connect!"
        intro="Du erreichst mich über folgende Kanäle – ich freue mich auf den Austausch."
      />
      <div className="section-body contact-grid">
        <a className="card contact-card" href="mailto:steven@example.com">
          <span className="contact-label">E-Mail</span>
          <strong>stevenbraun3107@icloud.com</strong>
        </a>
        <a
          className="card contact-card"
          href="https://www.linkedin.com/in/steven-braun-4a5266202/"
        >
          <span className="contact-label">LinkedIn</span>
          <strong>Steven Braun</strong>
        </a>
        <a className="card contact-card" href="#">
          <span className="contact-label">GitHub</span>
          <strong>github.com/thexsteven</strong>
        </a>
        <div className="card contact-card">
          <span className="contact-label">Standort</span>
          <strong>Bad Mergentheim, Deutschland</strong>
        </div>
      </div>
    </section>
  );
}
