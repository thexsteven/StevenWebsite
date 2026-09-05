import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader } from '@/components/editorial/Story';
import { MediaPlaceholder } from '@/components/editorial/MediaPlaceholder';

export const metadata: Metadata = { title: 'Reisen' };

export default function Reisen() {
  return <>
    <StoryHeader title="Unterwegs sein." intro="Für eine Sprachreise nach Hawaii. Mit dem Rad über die Alpen. Und manchmal beginnt die Geschichte schon auf dem Weg." back="/" backLabel="Startseite" />
    <section className="journey-list wrap" data-sc-act="flow">
      <article><Link className="image-link" href="/reisen/hawaii" aria-label="Hawaii entdecken"><MediaPlaceholder name="hawaii" /></Link><div><p className="meta">Hawaii · 2025</p><h2>Ein anderer Alltag.</h2><p>Die Sprachschule in Ala Moana, Oahu und eine Reise nach Big Island. Die Hawaii-Reise, erzählt in einzelnen Kapiteln.</p><Link className="text-link" href="/reisen/hawaii">Hawaii entdecken ↗</Link></div></article>
      <article><Link className="image-link" href="/reisen/radtour-cannes" aria-label="Radtour lesen"><MediaPlaceholder name="cycling" /></Link><div><p className="meta">Radtour · Sommer 2025</p><h2>Über die Alpen.</h2><p>Von zu Hause bis nach Südfrankreich. Mit dem Fahrrad, über die Berge und durch Turin.</p><Link className="text-link" href="/reisen/radtour-cannes">Die Radtour lesen ↗</Link></div></article>
    </section>
    <section className="nocturne dark section" data-sc-act="flow"><div><p className="meta">Auf dem Weg nach Venedig · 2026</p><h2>Die Berge.<br />Bei Nacht.</h2><p>Zu viert im Van über die Berge, mit Venedig als Ziel. Die Aufnahmen dieser Reise stammen von der Anfahrt. Dieses kleine Nachtstück bleibt deshalb genau dort: unterwegs.</p></div><div><MediaPlaceholder name="night" caption="Vorgesehen: eine Nachtaufnahme von der Anreise." /><MediaPlaceholder name="mountain" caption="Vorgesehen: das Bergpanorama vom Weg nach Venedig." /></div></section>
  </>;
}
