import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader, OpenQuestion } from '@/components/editorial/Story';
import { MediaPlaceholder } from '@/components/editorial/MediaPlaceholder';

export const metadata: Metadata = { title: 'Mit dem Rad nach Südfrankreich' };

export default function Radtour() {
  return <>
    <StoryHeader title="Über die Alpen. Bis nach Südfrankreich." meta="Radtour · Sommer 2025" intro="Eine Reise mit dem Fahrrad. Vom Aufbruch zu Hause über einen Alpenpass und Turin bis zur Ankunft in Südfrankreich." />
    <section className="story-grid wrap" data-sc-act="flow"><MediaPlaceholder name="cycling" caption="Vorgesehen: der Alpenpass auf der Radtour." /><nav className="chapter-nav" aria-label="Kapitel der Radtour"><h2>Die Strecke lesen</h2><a href="#aufbruch">Aufbruch <span>↗</span></a><a href="#alpen">Über die Berge <span>↗</span></a><a href="#turin">Turin <span>↗</span></a><a href="#kueche">Ein Abend in der Küche <span>↗</span></a><a href="#ankunft">Ankunft <span>↗</span></a></nav></section>
    <article className="prose">
      <section id="aufbruch"><h2>Vor der eigenen Tür.</h2><p>Im Sommer 2025 bin ich mit dem Rad über die Alpen bis nach Südfrankreich gefahren. Die Bildfolge beginnt an der Einfahrt zu Hause. Hier setzt auch die Geschichte an, bevor die Berge und die Orte unterwegs ihren Platz bekommen.</p><MediaPlaceholder name="departure" /><OpenQuestion>Wie kam die Idee zu dieser Tour? Was ging dir beim Losfahren durch den Kopf, und mit wem warst du unterwegs, ohne Namen zu nennen?</OpenQuestion></section>
      <section id="alpen"><h2>Über die Berge.</h2><p>Der Alpenpass markiert einen Übergang auf dem Weg nach Süden. Die Strecke führt anschließend durch Turin. Wie sich der Weg über die Berge tatsächlich angefühlt hat, gehört als persönliche Erinnerung hierher.</p><OpenQuestion>Welchen Pass seid ihr gefahren? Welche Situation am Berg erinnerst du besonders? Streckenlängen oder Höhenmeter bleiben ohne Beleg weg.</OpenQuestion></section>
      <section id="turin"><h2>Ein Zwischenhalt in Turin.</h2><MediaPlaceholder name="turin" /><p>Turin liegt in der überlieferten Bildfolge zwischen Alpenpass und Ankunft. Eine Stadt als Zwischenhalt auf einer Reise, die mit dem Rad begonnen hat und weiter nach Südfrankreich führt.</p><OpenQuestion>Was habt ihr in Turin gemacht und was zeigt die Aufnahme? Welche Begegnung oder Beobachtung gehört zu diesem Halt?</OpenQuestion></section>
    </article>
    <section id="kueche" className="pizza-spread dark section" data-sc-act="flow"><div className="wrap"><h2>Auf einmal geht es<br />um Pizzateig.</h2><MediaPlaceholder name="pizza" caption="Vorgesehen: die im Auftrag beschriebene Küchenszene." /></div></section>
    <article className="prose"><p>Ein Abend, an dem Fremde Pizzateig machen. Dieser Moment ist als Kern der Radtour-Geschichte vorgesehen. Die Tour bekommt hier Platz für eine Begegnung, nicht nur für ihren Verlauf.</p><OpenQuestion>Wie seid ihr in dieser Küche gelandet? Wer hat euch eingeladen, wie kam das Gespräch zustande und was ist an diesem Abend passiert? Bitte ohne Namen anderer Personen.</OpenQuestion><section id="ankunft"><h2>In Südfrankreich ankommen.</h2><MediaPlaceholder name="destination" /><p>Das Ziel dieser Radtour lag in Südfrankreich. Hinter dem Ankunftsbild liegt der Weg von zu Hause über die Alpen und Turin. Was von dieser Reise geblieben ist, soll den Schluss bilden.</p><OpenQuestion>Wo genau seid ihr angekommen? Was war euer erster Moment dort, und woran denkst du heute zuerst zurück?</OpenQuestion></section></article>
    <nav className="story-next wrap" aria-label="Weitere Reisen"><Link href="/reisen">← Alle Reisen</Link><Link href="/reisen/hawaii">Hawaii entdecken ↗</Link></nav>
  </>;
}
