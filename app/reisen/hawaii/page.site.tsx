import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader } from '@/components/editorial/Story';
import { TravelMedia } from '@/components/editorial/TravelMedia';
import { chapters } from '@/lib/editorial/chapters';

export const metadata: Metadata = { title: 'Hawaii 2025' };

export default function Hawaii() {
  return <>
    <StoryHeader title="Hawaii. Ein anderer Alltag." meta="Sprachreise · 2025" intro="Oahu war der Ort meiner Sprachreise, mit der Schule in Ala Moana. Dazu kam eine Reise nach Big Island. Hier bekommen beide Inseln ihre Geschichten." />
    <section className="story-grid wrap" data-sc-act="flow"><TravelMedia name="hawaii" /><nav className="chapter-nav" aria-label="Hawaii-Kapitel"><h2>Die Kapitel</h2>{chapters.map((chapter) => <Link key={chapter.slug} href={`/reisen/hawaii/${chapter.slug}`}>{chapter.title}<span aria-hidden="true">↗</span></Link>)}</nav></section>
    <div className="prose"><h2>Eine Reise, viele Perspektiven.</h2><p>Die Kapitel folgen keinem Wettlauf um die spektakulärste Aufnahme. Ankommen und Alltag stehen neben Ausflügen und Essen. Big Island bildet eine eigene Strecke innerhalb der Reise.</p><p>Der Fallschirmsprung bekommt im Kapitel „Unterwegs“ seinen Raum. Danach geht es wieder zurück zu den kleineren Dingen.</p><Link className="text-link" href="/reisen/hawaii/flug-ankunft">Mit der Ankunft beginnen ↗</Link></div>
  </>;
}
