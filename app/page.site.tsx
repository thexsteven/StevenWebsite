import Link from 'next/link';
import { MediaPlaceholder } from '@/components/editorial/MediaPlaceholder';
import { Contact } from '@/components/editorial/SiteChrome';
import { FallScene } from '@/components/editorial/Story';

export default function Home() {
  return <>
    <section className="cover dark" data-sc-act="flow">
      <div className="cover-back" data-sc-parallax="-0.4" aria-hidden="true" />
      <div className="cover-copy"><h1>Steven<br /><em>Braun.</em></h1><p>Dualer Student in Mosbach. Zuhause in Bad Mergentheim.<br />Unterwegs, um mehr zu sehen.</p><Link className="text-link" href="/reisen">Reisen entdecken <span aria-hidden="true">↗</span></Link></div>
      <div className="cover-portrait" data-sc-parallax="-0.9"><MediaPlaceholder name="portrait" /></div>
      <div className="cover-paper" data-sc-parallax="0.35" aria-hidden="true" />
    </section>
    <section className="travel-spread section" data-sc-act="flow">
      <div className="spread-heading"><p className="meta">Reisegeschichten</p><h2>Was bleibt,<br />wenn man loszieht.</h2><p>Eine Sprachreise im Pazifik. Mit dem Rad über die Alpen. Zwei Reisen, die hier ihren eigenen Platz bekommen.</p></div>
      <article className="travel-hawaii"><Link href="/reisen/hawaii" className="image-link" aria-label="Hawaii 2025 entdecken"><div data-sc-reveal="up" data-sc-reveal-at="0.05 0.3"><MediaPlaceholder name="hawaii" /></div></Link><div className="entry-caption"><span>Sprachreise · 2025</span><h3><Link href="/reisen/hawaii">Hawaii. Ein anderer Alltag. ↗</Link></h3><p>Oahu, die Sprachschule in Ala Moana und eine Reise nach Big Island.</p></div></article>
      <article className="travel-cycling"><Link href="/reisen/radtour-cannes" className="image-link" aria-label="Die Radtour nach Südfrankreich lesen"><MediaPlaceholder name="cycling" /></Link><div className="entry-caption"><span>Radtour · Sommer 2025</span><h3><Link href="/reisen/radtour-cannes">Über die Alpen. Bis nach Südfrankreich. ↗</Link></h3><p>Eine Reise mit dem Fahrrad, erzählt vom Aufbruch bis zur Ankunft.</p></div></article>
      <p className="quiet-line">Und dann gibt es einen Moment,<br />in dem aus unterwegs <em>mittendrin</em> wird.</p>
    </section>
    <FallScene />
    <section className="career-spread section" data-sc-act="flow"><h2>Neugierig bleiben.<br /><em>Weiterbauen.</em></h2><div className="career-copy" data-sc-in=""><p>Ich studiere dual an der DHBW Mosbach. Theorie und Praxis wechseln sich ab. Neben dem Studium baue ich Software und KI-Systeme.</p><p>Diese Website ist ein Teil davon: ein eigener Ort für die Dinge, die mich beschäftigen.</p><div className="inline-links"><Link className="text-link" href="/ueber-mich">Über mich ↗</Link><Link className="text-link" href="/karriere">Zum Studium ↗</Link></div></div></section>
    <Contact />
  </>;
}
