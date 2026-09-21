import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader } from '@/components/editorial/Story';
import { TravelMedia } from '@/components/editorial/TravelMedia';

export const metadata: Metadata = { title: 'Reisen' };

export default function Reisen() {
  return <>
    <StoryHeader title="Unterwegs sein." intro="Für eine Sprachreise nach Hawaii. Mit dem Rad über die Alpen. Und manchmal beginnt die Geschichte schon auf dem Weg." back="/" backLabel="Startseite" />
    <section className="journey-list wrap" data-sc-act="flow">
      <article><Link className="image-link" href="/reisen/hawaii" aria-label="Hawaii entdecken"><TravelMedia name="hawaii" /></Link><div><p className="meta">Hawaii · 2025</p><h2>Ein anderer Alltag.</h2><p>Die Sprachschule in Ala Moana, Oahu und eine Reise nach Big Island. Die Hawaii-Reise, erzählt in einzelnen Kapiteln.</p><Link className="text-link" href="/reisen/hawaii">Hawaii entdecken ↗</Link></div></article>
      <article><Link className="image-link" href="/reisen/radtour-cannes" aria-label="Radtour lesen"><TravelMedia name="cycling" /></Link><div><p className="meta">Radtour · Sommer 2025</p><h2>Über die Alpen.</h2><p>Von zu Hause bis nach Südfrankreich. Mit dem Fahrrad, über die Berge und durch Turin.</p><Link className="text-link" href="/reisen/radtour-cannes">Die Radtour lesen ↗</Link></div></article>
      <article><Link className="image-link" href="/reisen/venedig" aria-label="Venedig-Reise lesen"><TravelMedia name="venice" /></Link><div><p className="meta">Venedig · 2026</p><h2>Auf Umwegen.</h2><p>Mit dem Wohnmobil von München durch die Dolomiten bis nach Venedig. Ein langes Wochenende zwischen kalten Bergen, Kanälen und neuen Begegnungen.</p><Link className="text-link" href="/reisen/venedig">Die Venedig-Reise lesen ↗</Link></div></article>
    </section>
  </>;
}
