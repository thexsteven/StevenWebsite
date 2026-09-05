import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Steven Braun, Startseite">Steven Braun<span aria-hidden="true">.</span></Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/reisen">Reisen</Link>
        <Link href="/ueber-mich">Über mich</Link>
        <Link href="/karriere">Karriere</Link>
        <Link href="/#kontakt">Kontakt</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/">Steven Braun.</Link>
      <span>Unterwegs. Und immer am Lernen.</span>
      <nav aria-label="Rechtliche Informationen">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
      </nav>
    </footer>
  );
}

export function Contact() {
  return (
    <section id="kontakt" className="contact section" data-sc-act="flow">
      <div className="contact-title"><p className="meta">Bad Mergentheim</p><h2>Eine Geschichte<br />beginnt mit Hallo.</h2></div>
      <div className="contact-details">
        <p>Eine Frage zu einer Reise oder eine Idee, über die wir sprechen sollten? Schreib mir.</p>
        <a className="text-link" href="mailto:stevenbraun3107@icloud.com">Kontakt <span aria-hidden="true">↗</span></a>
        <p className="email">stevenbraun3107@icloud.com</p>
        <div className="social-links"><a href="https://www.linkedin.com/in/steven-braun-4a5266202/">LinkedIn ↗</a><a href="https://github.com/thexsteven">GitHub ↗</a></div>
      </div>
    </section>
  );
}
