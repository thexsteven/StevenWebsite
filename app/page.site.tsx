import Link from 'next/link';
import { TravelMedia } from '@/components/editorial/TravelMedia';
import { Contact } from '@/components/editorial/SiteChrome';
import { FallScene } from '@/components/editorial/Story';
import { AvatarHero } from '@/components/editorial/AvatarHero';
import { StudyPreview } from '@/components/editorial/StudyPreview';

export default function Home() {
  return <div className="society-home dark">
    <AvatarHero />
    <section className="society-travels" data-sc-act="flow">
      <div className="society-section-title"><h2>Losziehen.<br /><span>Und etwas mitnehmen.</span></h2><p>Eine Sprachreise im Pazifik. Mit dem Rad über die Alpen. Hier bekommen die Reisen ihre Geschichten.</p></div>
      <article className="journey-panel"><div className="panel-copy"><p className="meta">Hawaii · 2025</p><h3>Ein anderer Ort.<br />Ein anderer Alltag.</h3><p>Oahu, die Sprachschule in Ala Moana und eine Reise nach Big Island.</p><Link className="text-link" href="/reisen/hawaii">Hawaii entdecken ↗</Link></div><Link className="panel-media" href="/reisen/hawaii" aria-label="Hawaii 2025 entdecken"><div data-sc-reveal="up" data-sc-reveal-at="0.02 0.22"><TravelMedia caption={false} name="hawaii" /></div></Link></article>
      <article className="journey-panel cycling-panel"><div className="panel-copy"><p className="meta">Radtour · Sommer 2025</p><h3>Über die Alpen.<br />Bis nach Südfrankreich.</h3><p>Vom Aufbruch vor der eigenen Tür über die Berge und Turin bis zur Ankunft.</p><Link className="text-link" href="/reisen/radtour-cannes">Die Radtour lesen ↗</Link></div><Link className="panel-media" href="/reisen/radtour-cannes" aria-label="Die Radtour nach Südfrankreich lesen"><TravelMedia caption={false} name="cycling" /></Link></article>
      <p className="society-silence">Manche Wege führen weiter.<br /><span>Dieser führt erst einmal nach unten.</span></p>
    </section>
    <FallScene />
    <section id="studium" className="society-career" aria-labelledby="study-title" data-sc-act="flow"><div><p className="meta">DHBW Mosbach · Theorie & Praxis</p><h2 id="study-title">Verstehen.<br /><span>Ausprobieren. Weiterdenken.</span></h2></div><div className="career-copy"><p>Was ich im dualen Studium lerne – und wie ich damit arbeite. Entdecke die Themen meiner Module, eigene Lernprojekte und Einblicke in die Praxis.</p><p>Von Python und linearer Algebra bis zu Webprojekten und Algorithmen. Zu den Modulen findest du ausgewählte Notion-Ansichten mit meinen Lernnotizen.</p><Link className="text-link" href="/karriere">Studium im Überblick ↗</Link></div><StudyPreview /></section>
    <Contact />
  </div>;
}
