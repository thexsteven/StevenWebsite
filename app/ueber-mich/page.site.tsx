import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader, OpenQuestion } from '@/components/editorial/Story';
import { MediaPlaceholder } from '@/components/editorial/MediaPlaceholder';
import { Contact } from '@/components/editorial/SiteChrome';

export const metadata: Metadata = { title: 'Über mich' };

export default function UeberMich() {
  return <>
    <StoryHeader title="Der Mensch dazwischen." intro="Ich bin Steven Braun. Ich studiere dual, baue Software und KI-Systeme und bin gern unterwegs." back="/" backLabel="Startseite" />
    <section className="story-grid wrap" data-sc-act="flow"><MediaPlaceholder name="portrait" caption="Steven Braun" /><div><h2>Zuhause und unterwegs.</h2><p className="about-intro">Mein Alltag hat seinen Ausgangspunkt in Bad Mergentheim. Das duale Studium führt mich an die DHBW Mosbach und zu meinem Praxispartner, einem international tätigen Technologieunternehmen in der Automatisierungstechnik.</p></div></section>
    <article className="prose"><h2>Was mich beschäftigt.</h2><p>Software und KI-Systeme entstehen bei mir auch neben dem Studium. Diese Website ist eine eigene Arbeitsprobe. Sie bringt die Reisegeschichten mit meinem Werdegang zusammen.</p><p>Sport und Training gehören ebenfalls zu meinem Leben. Sie bekommen hier einen Platz als Teil meiner Person.</p><MediaPlaceholder name="sport" /><h2>Mein Weg, bisher.</h2><ol className="timeline"><li><h3>Duales Studium · Gegenwart</h3><p>DHBW Mosbach, mit Theorie- und Praxisphasen im Wechsel.</p><Link href="/karriere">Zum Studium ↗</Link></li><li><h3>Hawaii · 2025</h3><p>Sprachreise nach Oahu, Sprachschule in Ala Moana und eine Reise nach Big Island.</p></li><li><h3>Über die Alpen · Sommer 2025</h3><p>Mit dem Fahrrad bis nach Südfrankreich.</p></li><li><h3>Richtung Venedig · 2026</h3><p>Zu viert mit dem Van über die Berge.</p></li></ol><OpenQuestion>Welche Stationen vor dem Studium sollen in deinen Lebenslauf? Bitte bestätige Ausbildung oder Schulabschluss, Orte und Zeiträume, die du öffentlich nennen möchtest.</OpenQuestion></article>
    <Contact />
  </>;
}
