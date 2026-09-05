import Link from 'next/link';
import { TravelMedia } from '@/components/editorial/TravelMedia';
import { Contact } from '@/components/editorial/SiteChrome';
import { FallScene } from '@/components/editorial/Story';
import { TravelWindow } from '@/components/editorial/TravelWindow';

export default function Home() {
  return <div className="society-home dark">
    <section className="society-hero" data-sc-act="flow">
      <div className="society-intro">
        <p className="identity-line"><span /> Steven Braun · Reisen und Gedanken</p>
        <h1>Unterwegs sein.<br /><span>Neugierig bleiben.</span></h1>
        <p>Dualer Student. Ich baue Software und KI-Systeme.<br />Und entdecke gern, was hinter dem Alltag liegt.</p>
        <Link className="solid-link" href="/reisen">Reisen entdecken <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="journey-stage">
        <div className="journey-back" data-sc-parallax="-0.35" aria-hidden="true" />
        <div className="journey-surface" data-sc-parallax="-0.85"><TravelWindow /></div>
        <div className="journey-edge" data-sc-parallax="0.4" aria-hidden="true" />
      </div>
    </section>
    <section className="society-travels" data-sc-act="flow">
      <div className="society-section-title"><h2>Losziehen.<br /><span>Und etwas mitnehmen.</span></h2><p>Eine Sprachreise im Pazifik. Mit dem Rad über die Alpen. Hier bekommen die Reisen ihre Geschichten.</p></div>
      <article className="journey-panel"><div className="panel-copy"><p className="meta">Hawaii · 2025</p><h3>Ein anderer Ort.<br />Ein anderer Alltag.</h3><p>Oahu, die Sprachschule in Ala Moana und eine Reise nach Big Island.</p><Link className="text-link" href="/reisen/hawaii">Hawaii entdecken ↗</Link></div><Link className="panel-media" href="/reisen/hawaii" aria-label="Hawaii 2025 entdecken"><div data-sc-reveal="up" data-sc-reveal-at="0.02 0.22"><TravelMedia caption={false} name="hawaii" /></div></Link></article>
      <article className="journey-panel cycling-panel"><div className="panel-copy"><p className="meta">Radtour · Sommer 2025</p><h3>Über die Alpen.<br />Bis nach Südfrankreich.</h3><p>Vom Aufbruch vor der eigenen Tür über die Berge und Turin bis zur Ankunft.</p><Link className="text-link" href="/reisen/radtour-cannes">Die Radtour lesen ↗</Link></div><Link className="panel-media" href="/reisen/radtour-cannes" aria-label="Die Radtour nach Südfrankreich lesen"><TravelMedia caption={false} name="cycling" /></Link></article>
      <p className="society-silence">Manche Wege führen weiter.<br /><span>Dieser führt erst einmal nach unten.</span></p>
    </section>
    <FallScene />
    <section className="society-career" data-sc-act="flow"><h2>Zwischen Reisen<br /><span>und Weiterdenken.</span></h2><div className="career-copy" data-sc-in=""><p>Ich studiere dual an der DHBW Mosbach. Theorie und Praxis wechseln sich ab. Neben dem Studium baue ich Software und KI-Systeme.</p><p>Diese Website ist ein Teil davon: ein eigener Ort für die Dinge, die mich beschäftigen.</p><div className="inline-links"><Link className="text-link" href="/ueber-mich">Über mich ↗</Link><Link className="text-link" href="/karriere">Zum Studium ↗</Link></div></div></section>
    <Contact />
  </div>;
}
